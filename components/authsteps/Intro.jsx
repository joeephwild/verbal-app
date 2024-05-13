import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { intro } from "../../utils";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Card = ({ item }) => {
  return (
    <View
      style={{ backgroundColor: item.color, height: hp(30), width: wp(85) }}
      className="rounded-[8px] py-[24px] px-[24px] items-start justify-center"
    >
      <View className="">
        <Text style={{width: wp(60)}} className="text-[28px] text-[#ffffff] font-bold leading-normal">
          {item.title}
        </Text>
        <Text style={{maxWidth: wp(90)}} className="text-[16px] text-[#ffffff]  font-semibold leading-normal">
          {item.desc}
        </Text>
      </View>
    </View>
  );
};

const Intro = ({nextStep}) => {
  return (
    <View className="gap-[24px]  items-center justify-center">
      {intro.map((item, i) => (
        <View key={i}>
          <Card item={item} />
        </View>
      ))}
      <View className="items-center my-5 justify-center">
        <Pressable
          onPress={nextStep}
          className="bg-[#F70] w-[342px] py-[16px] rounded-[8px]"
        >
          <Text className="text-[16px] text-center text-white  font-bold leading-normal">
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Intro;
