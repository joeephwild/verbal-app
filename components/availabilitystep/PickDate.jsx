import { View, Text, Pressable } from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { Calendar } from "react-native-calendars";
import { createMeeting } from "../../utils/create-room";

const PickDate = ({ handleClick, setSelectedDate, setTime }) => {
  return (
    <View className="mx-[24px] mt-[16px]">
      <View className="flex-row items-center space-x-4 ">
        <ChevronLeftIcon color="#fff" size={25} />
        <Text className="text-[20px] font-semibold text-[#fff] leading-normal">
          Select date and time
        </Text>
      </View>
      <Text className="text-[12px] text-[#676767] leading-normal font-normal">
        In your local time zone (Africa/Lagos). Update
      </Text>
      <View className="mt-[24px]">
        <Calendar
          onDayPress={(day) => {
            console.log("selected day", day);
            setSelectedDate(day.dateString);
          }}
          date=""
          theme={{
            backgroundColor: "#010F15",
            calendarBackground: "#010F15",
            dayTextColor: "#AAAAAAAA",
            textSectionTitleColor: "#AAAAAAAA",
            selectedDayTextColor: "green",
            arrowColor: "#fff",
          }}
          disableArrowleft
          style={{
            backgroundColor: "#010F15",
            borderColor: "#FFFFFF",
            borderWidth: 3,
            width: 342,
            height: 358,
          }}
        />

        <View
          style={{ borderWidth: 3, borderRadius: 8, borderColor: "#fff" }}
          className="w-[342px] h-[203px] mt-[24px] py-[24px] px-5"
        >
          <Text className="text-[16px] font-black text-[#fff]">
            Available time slots
          </Text>
          <View className="flex-row flex-wrap pt-[16px] gap-2">
            <Pressable
              onPress={() => setTime("8:00")}
              className="border-[#2D3440] border p-[8px] rounded-[12px] gap-[4px]"
            >
              <Text className="text-[16px] text-[#fff] font-black leading-normal">
                8:00pm
              </Text>
            </Pressable>
            <Pressable
              onPress={() => createMeeting()}
              className="border-[#2D3440] border p-[8px] rounded-[12px] gap-[4px]"
            >
              <Text className="text-[16px] text-[#fff] font-black leading-normal">
                8:00pm
              </Text>
            </Pressable>
            <Pressable className="border-[#2D3440] border p-[8px] rounded-[12px] gap-[4px]">
              <Text className="text-[16px] text-[#fff] font-black leading-normal">
                8:00pm
              </Text>
            </Pressable>
            <Pressable className="border-[#2D3440] border p-[8px] rounded-[12px] gap-[4px]">
              <Text className="text-[16px] text-[#fff] font-black leading-normal">
                8:00pm
              </Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          onPress={() => handleClick("next")}
          className="bg-[#F70] w-full mt-[24px] py-[16px] rounded-[8px] items-center justify-center"
        >
          <Text className="text-[16px] text-white font-bold leading-normal">
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PickDate;