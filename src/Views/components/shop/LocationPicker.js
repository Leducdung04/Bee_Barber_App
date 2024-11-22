import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomTextInput from "./CustomTextInput";

const LocationPicker = ({ userLocation,onLocationChange }) => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [provinceParentCode, setProvinceParentCode] = useState(null);
  const [street, setStreet] = useState(userLocation?.location.street || "");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtParentCode, setDistrictParentCode] = useState(null);

  const [selectedCommune, setSelectedCommune] = useState(null);

  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [communeList, setCommuneList] = useState([]);

  const fetchProvinces = async () => {
    try {
      const response = await fetch("https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1");
      const data = await response.json();
      setProvinceList(data.data.data);

    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };


  const fetchDistrictsByProvince = async () => {

    if (!provinceParentCode) return;
    try {
      const response = await fetch(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${provinceParentCode}&limit=-1`);
      const data = await response.json();
      setDistrictList(data.data.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchCommunesByDistrict = async () => {
    if (!districtParentCode) return;
    try {
      const response = await fetch(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${districtParentCode}&limit=-1`);
      const data = await response.json();
      setCommuneList(data.data.data);
    } catch (error) {
      console.error("Error fetching communes:", error);
    }
  };

  useEffect(() => {
    onLocationChange({
      province: selectedProvince,
      district: selectedDistrict,
      commune: selectedCommune,
      street: street,
    });
  }, [selectedProvince, selectedDistrict, selectedCommune, street]);

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (provinceParentCode) {
      fetchDistrictsByProvince();
    }
  }, [provinceParentCode]);

  useEffect(() => {
    if (districtParentCode) {
      fetchCommunesByDistrict();
    }
  }, [districtParentCode]);

  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={selectedProvince}
          onValueChange={(value) => {
            setSelectedProvince(value);
            setProvinceParentCode(value?.code || null);
            console.log(value, "Selected Province");
          }}
          style={styles.picker}
        >
          <Picker.Item label="Tỉnh / Thành Phố*" value={null} />
          {provinceList.map((item) => (
            <Picker.Item key={item._id} label={item.name} value={item} />
          ))}
        </Picker>
      </View>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={selectedDistrict}
          onValueChange={(value) => {
            setSelectedDistrict(value);
            setDistrictParentCode(value?.code || null);
          }}
          style={styles.picker}
          enabled={!!selectedProvince}
        >
          <Picker.Item label="Quận / Huyện*" value={null} />
          {districtList.map((item) => (
            <Picker.Item key={item._id} label={item.name} value={item} />
          ))}
        </Picker>
      </View>

      <View style={styles.dropdown}>
        <Picker
          selectedValue={selectedCommune}
          onValueChange={(value) => setSelectedCommune(value)}
          style={styles.picker}
          enabled={!!selectedDistrict}
        >
          <Picker.Item label="Xã / Thị trấn*" value={null} />
          {communeList.map((item) => (
            <Picker.Item key={item._id} label={item.name} value={item} />
          ))}
        </Picker>
      </View>

      <CustomTextInput label='Nhập tòa nhà / tên đường' error='Vui lòng nhập đầy đủ tòa nhà / tên đường' value={street}
        onChangeText={(text) => setStreet(text)} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  dropdown: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
  },
  picker: {
    height: 40,
    width: "100%",
  },
});

export default LocationPicker;

