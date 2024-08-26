import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import styles from "./styles";

const TemplatePage = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.main}>
      <Text>test</Text>
    </View>
  );
};

export default TemplatePage;
