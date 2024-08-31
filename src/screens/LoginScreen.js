import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async values => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('password', values.password);

      const response = await fetch(
        'http://3.7.81.243/projects/plie-api/public/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        },
      );

      const data = await response.json();
      if (response.ok) {
        console.log(data, 'response====>');
        const { token, user } = data.data;

        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(user));

        navigation.navigate("Home");
      } else {
        Alert.alert('Login Failed', data.message || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert('Error', 'Failed to enter as guest');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <StatusBar backgroundColor="#d3d3d3" barStyle="light-content" />
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Plié</Text>
        <View style={styles.imagePlaceholder}>
          <Image
            source={require('../assets/gallery.png')}
            style={styles.galleryIcon}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={handleLogin}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                style={[
                  styles.input,
                  touched.email && errors.email ? styles.inputError : null,
                ]}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor="#888"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.passwordInput,
                    touched.password && errors.password
                      ? styles.inputError
                      : null,
                  ]}
                  placeholder="Password"
                  secureTextEntry={!isPasswordVisible}
                  placeholderTextColor="#888"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setPasswordVisible(!isPasswordVisible)}>
                  <Icon
                    name={isPasswordVisible ? 'eye' : 'eye-slash'}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signInButton}
                onPress={handleSubmit}>
                <Text style={styles.signInButtonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
              </TouchableOpacity>

              <View style={styles.signUpContainer}>
                <Text style={styles.memberText}>Not a member?</Text>
                <TouchableOpacity>
                  <Text style={styles.signUpText}> Sign Up Here</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or Sign in with</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <Icon name="google" size={24} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Icon name="apple" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Icon name="facebook" size={24} color="#4267B2" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
                <Text style={styles.guestText}>Enter as Guest</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    width: '100%',
    height: '35%',
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    // No padding or margin
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 40,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryIcon: {
    width: 80,
    height: 80,
  },
  formContainer: {
    flexGrow: 1,
    padding: 20, // Padding for Formik content
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    color: 'grey',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  inputContainer: {
    width: '100%',
    position: 'relative',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  passwordInput: {
    width: '100%',
    height: 50,
    paddingLeft: 10,
    paddingRight: 40,
    color: '#000',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
    zIndex: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#888',
    marginBottom: 10,
  },
  signInButton: {
    alignSelf: 'flex-end',
    width: '30%',
    height: 50,
    backgroundColor: '#00b894',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  signUpContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginBottom: 40,
  },
  signUpText: {
    color: '#00b894',
    marginLeft: 5,
  },
  memberText: {
    color: 'grey',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#888',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginVertical: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  guestButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  guestText: {
    color: 'grey',
  },
});

export default LoginScreen;
