import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import styles from "./styles";
import type { TemplateComponentProps } from "./type";

const TemplateComponent = (props: TemplateComponentProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.main} {...props}>
      <Text>TemplateComponent</Text>
    </View>
  );
};

export default TemplateComponent;
