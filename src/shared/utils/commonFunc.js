import { Dimensions } from "react-native";

/**
  * Validate string format is in JSON format
  * @param str 
  * @return boolean
*/
export function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/**
  * Get screen height
  * @param percentageHeight 
  * @param offset 
  * @return Dimension 
*/
export function screenHeight(percentageHeight, offset) {
  return (Dimensions.get('window').height * (percentageHeight / 100)) - offset;
}

/**
  * Get screen width
  * @param percentageWidth
  * @param offset 
  * @return Dimension 
*/
export function screenWidth(percentageWidth, offset) {
  return (Dimensions.get('window').width * (percentageWidth / 100)) - offset;
}
