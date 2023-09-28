const DropdownWithImages = () => {
  return (
    <View>
      <RNPickerSelect
        items={dropdownItems}
        onValueChange={(value) => console.log(value)}
        style={{
          inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 4,
            color: "black",
          },
          inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: "purple",
            borderRadius: 8,
            color: "black",
          },
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}
        placeholder={{ label: "Select an option", value: null }}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return <Image source={require("../../assets/Hook.png")} />;
        }}
      />
    </View>
  );
};

export default DropdownWithImages;
