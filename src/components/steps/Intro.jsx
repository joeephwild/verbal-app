import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { intro } from "../../utils";

const Card = ({ item }) => {
  return (
    <View
      style={{ backgroundColor: item.color }}
      className="w-[340px] h-[228px] mb-[8x] space-y-[8px] rounded-[8px] px-[24px] tems-center justify-center"
    >
      <Text className="text-[28px] text-[#ffffff] font-bold leading-normal">
        {item.title}
      </Text>
      <Text className="text-[16px] text-[#ffffff]  font-semibold leading-normal">
        {item.desc}
      </Text>
    </View>
  );
};

const Intro = () => {
  return (
    <View className="gap-[24px] mx-[24px] items-center justify-center">
      {intro.map((item, i) => (
        <View>
          <Card key={i} item={item} />
        </View>
      ))}
    </View>
  );
};

export default Intro;
