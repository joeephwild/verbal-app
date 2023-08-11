import { View, Text, Pressable, Image, Alert } from "react-native";
import React from "react";
import {
  ArrowLeftOnRectangleIcon,
  EllipsisVerticalIcon,
  HandRaisedIcon,
  UserGroupIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ArrowUpOnSquareIcon,
  ChatBubbleBottomCenterIcon,
  MicrophoneIcon,
} from "react-native-heroicons/solid";

const MainStudio = ({ setEnterRoom }) => {
  const [muted, setMuted] = React.useState(false);
  return (
    <View>
      <View
        style={{
          width: wp(100),
        }}
        className="flex-row items-center justify-between px-[24px] pt-[8px]"
      >
        <Pressable
          onPress={() => setEnterRoom(false)}
          className="flex-row w-[80px] h-[41px]  bg-[#F70] py-[16px] rounded-[8px] items-center justify-center"
        >
          <ArrowLeftOnRectangleIcon size={24} color="#fff" />
          <EllipsisVerticalIcon size={24} color="#fff" />
        </Pressable>
        <View className="flex-row items-center space-x-[12px]">
          <Pressable className="border-[#2D3440] border-2 p-[8px] rounded-[12px] gap-[4px]">
            <HandRaisedIcon size={32} color="#fff" />
          </Pressable>
          <Pressable className="border-[#2D3440] border-2 p-[8px] rounded-[12px] gap-[4px]">
            <Image
              source={require("../../assets/images/brb.png")}
              className="w-[24px] h-[24px] object-contain"
            />
          </Pressable>
          <Pressable className="border-[#2D3440] flex-row items-center border-2 p-[8px] rounded-[12px] gap-[4px]">
            <UserGroupIcon size={32} color="#fff" />
            <Text className="text-[#fff] font-bold text-[16px]">2</Text>
          </Pressable>
        </View>
      </View>

      <View className="grid grid-cols-1 gap-[19px] items-center justify-center mx-[24px] mt-[16px]">
        <View className="w-[342px] h-[324px] justify-center items-center bg-[#0F1115]">
          <Image
            style={{
              width: wp(90),
              height: hp(39),
            }}
            source={require("../../assets/images/video.png")}
            className="rounded-[8px] object-cover"
          />
        </View>
        <View className="w-[342px] h-[324px] justify-center items-center bg-[#0F1115]">
          <Image
            style={{
              width: wp(90),
              height: hp(35),
            }}
            source={require("../../assets/images/video2.png")}
            className="rounded-[8px] object-cover"
          />
        </View>

        <View
          style={{
            width: wp(90),
          }}
          className="flex-row items-center mt-[127px] space-x-[20px]"
        >
          <Pressable className="border-[#2D3440] border p-[8px] rounded-[12px] gap-[4px]">
            <MicrophoneIcon size={24} color="#fff" />
          </Pressable>
          <Pressable className="border-[#2D3440] border p-[8px] rounded-[12px] gap-[4px]">
            <ArrowUpOnSquareIcon size={24} color="#fff" />
          </Pressable>
          <Pressable className="border-[#2D3440] border p-[8px] rounded-[12px] gap-[4px]">
            <MicrophoneIcon size={24} color="#fff" />
          </Pressable>
          <Pressable
            onPress={() => setMuted(!muted)}
            className="border-[#2D3440] border p-[8px] rounded-[12px] gap-[4px]"
          >
            {muted ? (
              <VideoCameraSlashIcon size={24} color="#fff" />
            ) : (
              <VideoCameraIcon size={24} color="#fff" />
            )}
          </Pressable>
          <Pressable className="border-[#2D3440] border p-[8px] rounded-[12px] gap-[4px]">
            <EllipsisVerticalIcon size={24} color="#fff" />
          </Pressable>
          <Pressable className="border-[#2D3440] border p-[8px] rounded-[12px] gap-[4px]">
            <ChatBubbleBottomCenterIcon size={24} color="#fff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MainStudio;
