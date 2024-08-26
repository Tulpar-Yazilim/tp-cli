import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import styles from "./styles";

const TemplatePage = ({ props }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.main}>
      <Text>TemplatePage</Text>
    </View>
  );
};

export default TemplatePage;
