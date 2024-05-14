import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { CloseStream } from "../generated/schema"
import { CloseStream as CloseStreamEvent } from "../generated/Contract/Contract"
import { handleCloseStream } from "../src/contract"
import { createCloseStreamEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let to = Address.fromString("0x0000000000000000000000000000000000000001")
    let newCloseStreamEvent = createCloseStreamEvent(to)
    handleCloseStream(newCloseStreamEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CloseStream created and stored", () => {
    assert.entityCount("CloseStream", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CloseStream",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "to",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
