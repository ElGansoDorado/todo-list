import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const SlidingPanelButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current; // для смещения кнопки
  const panelAnim = useRef(new Animated.Value(0)).current; // для открытия панели

  const togglePanel = () => {
    if (isOpen) {
      // Закрываем панель и возвращаем кнопку в исходное положение
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(panelAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setIsOpen(false));
    } else {
      // Смещаем кнопку и открываем панель
      setIsOpen(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -20, // смещение влево на 20 пикселей
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(panelAnim, {
          toValue: 1, // панель полностью открыта
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return (
    <View style={styles.container}>
      {/* Всплывающая панель */}
      <Animated.View
        style={[
          styles.panel,
          {
            transform: [
              {
                translateX: panelAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [width, width - 250], // ширина панели - 250
                }),
              },
            ],
            opacity: panelAnim,
          },
        ]}
      >
        <Text style={styles.panelText}>Дополнительная панель</Text>
      </Animated.View>

      {/* Кнопка */}
      <Animated.View
        style={{
          transform: [{ translateX: slideAnim }],
        }}
      >
        <TouchableOpacity style={styles.button} onPress={togglePanel}>
          <Text style={styles.buttonText}>Нажми меня</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f0f0f0',
  },
  button: {
    backgroundColor:'#007AFF',
    paddingVertical:15,
    paddingHorizontal:30,
    borderRadius:8,
    elevation:3,
  },
  buttonText:{
    color:'#fff',
    fontSize:16,
    fontWeight:'bold',
  },
  panel:{
    position:'absolute',
    top:0,
    right:0,
    width:250, // ширина панели
    height:'100%',
    backgroundColor:'#fff',
    shadowColor:'#000',
    shadowOffset:{width:0,height:2},
    shadowOpacity:.25,
    shadowRadius:4,
    elevation:5,
    justifyContent:'center',
    alignItems:'center',
    zIndex:-1, // чтобы не перекрывать кнопку
  },
  panelText:{
    fontSize:18,
    fontWeight:'bold',
  },
});

export default SlidingPanelButton;