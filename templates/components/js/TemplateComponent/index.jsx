import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import styles from "./styles";

const TemplateComponent = (props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.main} {...props}>
      <Text>TemplateComponent</Text>
    </View>
  );
};

export default TemplateComponent;
