import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import Card from "../components/Card";
import { useSelector, useDispatch } from "react-redux";
import VideoService from "../service/VideoService";

const LittleCard = ({ name, keyword }) => {
  const dispatch = useDispatch();
  const videoService = new VideoService();
  const [loading, setLoading] = useState(false);
  const fetchData = () => {
    setLoading(true);
    videoService.getVideoBykeyword(keyword, 25).then((data) => {
      setLoading(false);
      dispatch({ type: "add", payload: data.items });
    });
  };
  return (
    <View>
      <TouchableOpacity activeOpacity={0.3} onPress={() => fetchData()}>
        <View
          style={{
            backgroundColor: "red",
            height: 50,
            width: 180,
            borderRadius: 4,
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 22,
              marginTop: 5,
            }}
          >
            {name}
          </Text>
          {loading && (
            <ActivityIndicator style={{}} size="large" color="white" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Explore = () => {
  const cardData = useSelector((state) => {
    return state.cardData;
  });
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <LittleCard name="Gaming" keyword="Việt Nam gaming" />
        <LittleCard name="Trending" keyword="Việt Nam trending" />
        <LittleCard name="Music" keyword="Việt Nam music" />
        <LittleCard name="News" keyword="Việt Nam news" />
        <LittleCard name="Movies" keyword="Việt Nam movies" />
        <LittleCard name="Fashion" keyword="Việt Nam fashion" />
      </View>
      <Text
        style={{
          margin: 8,
          fontSize: 22,
          borderBottomWidth: 1,
        }}
      >
        Trending Videos
      </Text>

      <FlatList
        data={cardData}
        renderItem={({ item }) => {
          return (
            <Card
              videoId={item.id.videoId}
              title={item.snippet.title}
              channel={item.snippet.channelTitle}
            />
          );
        }}
        keyExtractor={(item) => item.id.videoId}
      />
    </View>
  );
};

export default Explore;
