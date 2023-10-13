import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { auth, db } from "../firebase";
import { collection, getDocs, orderBy, where } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const userUid = auth.currentUser.uid;
  useEffect(() => {
    const getOrders = async () => {
      const querySnapshot = await getDocs(
        collection(db, "all_orders"),
        where("userUid", "==", userUid),
        orderBy("createdAt", "desc")
      );
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
      setOrders(tempDoc);
    };
    getOrders();
  }, []);
  function getDateFromSeconds(seconds) {
    const milliseconds = seconds * 1000;
    return new Date(milliseconds).toDateString();
  }
  return (
    <View>
      <SafeAreaView />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          borderWidth: 1,
          padding: 10,
        }}
      >
        All Orders
      </Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        style={{ padding: 10 }}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={{
              borderWidth: 1,
              padding: 2,
              marginVertical: 2,
              borderRadius: 5,
              borderColor: "gray",
            }}
          >
            {item.items.map((each) => (
              <View
                key={each.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={{ uri: each.image }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {each.name}{" "}
                  </Text>
                </View>
                <View>
                  <Text>Quantity: {each.quantity}</Text>
                  <Text>Each: {each.price} TK </Text>
                  <Text>Total: {each.quantity * each.price} TK </Text>
                </View>
                <View>
                  <Text>
                    Order Date:{" "}
                    {getDateFromSeconds(item.createdAt).replace("3992", "")}{" "}
                  </Text>
                  <Text>
                    Pickup Date: {getDateFromSeconds(item.pickUpDate.seconds)}{" "}
                  </Text>
                  <Text>Delivery Time: {item.selectedTime} </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default AllOrders;
