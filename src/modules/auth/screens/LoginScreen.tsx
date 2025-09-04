import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { ThemedText } from '../../../../components/ThemedText';

const LoginScreen = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
		confirmPassword: '',
	});

	const handleInputChange = (field, value) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	const handleSubmit = () => {
		console.log('Form submitted:', formData);
	};

	const toggleMode = () => {
		setIsLogin(!isLogin);
		setFormData({
			email: '',
			password: '',
			name: '',
			confirmPassword: '',
		});
	};

	return (
		<LinearGradient
			colors={['#0F172A', '#581C87', '#0F172A']}
			style={styles.container}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.keyboardView}
			>
				<ScrollView
					contentContainerStyle={styles.scrollContainer}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.header}>
						<View style={styles.logoContainer}>
							<LinearGradient
								colors={['#8B5CF6', '#EC4899']}
								style={styles.logoGradient}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 1 }}
							>
								<MaterialIcons name='fitness-center' size={32} color='white' />
							</LinearGradient>
						</View>
						<ThemedText style={styles.title}>
							{isLogin ? 'Bienvenido' : 'Únete al Gimnasio'}
						</ThemedText>
						<ThemedText style={styles.subtitle}>
							{isLogin ? 'Accede a tu cuenta' : 'Crea tu cuenta nueva'}
						</ThemedText>
					</View>

					<Card style={styles.card} elevation={0}>
						<Card.Content style={styles.cardContent}>
							{!isLogin && (
								<TextInput
									label='Nombre completo'
									value={formData.name}
									onChangeText={text => handleInputChange('name', text)}
									mode='outlined'
									style={styles.input}
									left={<TextInput.Icon icon='account' />}
								/>
							)}

							<TextInput
								label={'Correo electrónico'}
								value={formData.email}
								onChangeText={text => handleInputChange('email', text)}
								mode='outlined'
								keyboardType='email-address'
								autoCapitalize='none'
								style={styles.input}
								left={<TextInput.Icon icon='email' />}
							/>

							<TextInput
								label='Contraseña'
								value={formData.password}
								onChangeText={text => handleInputChange('password', text)}
								mode='outlined'
								secureTextEntry={!showPassword}
								style={styles.input}
								left={<TextInput.Icon icon='lock' />}
								right={
									<TextInput.Icon
										icon={showPassword ? 'eye-off' : 'eye'}
										onPress={() => setShowPassword(!showPassword)}
									/>
								}
							/>

							{!isLogin && (
								<TextInput
									label='Confirmar contraseña'
									value={formData.confirmPassword}
									onChangeText={text => handleInputChange('confirmPassword', text)}
									mode='outlined'
									secureTextEntry={!showConfirmPassword}
									style={styles.input}
									left={<TextInput.Icon icon='lock' />}
									right={
										<TextInput.Icon
											icon={showConfirmPassword ? 'eye-off' : 'eye'}
											onPress={() => setShowConfirmPassword(!showConfirmPassword)}
										/>
									}
								/>
							)}

							{isLogin && (
								<View style={styles.forgotPasswordContainer}>
									<Button
										mode='text'
										onPress={() => console.log('Forgot password')}
										labelStyle={styles.forgotPasswordText}
									>
										¿Olvidaste tu contraseña?
									</Button>
								</View>
							)}

							<LinearGradient
								colors={['#8B5CF6', '#EC4899']}
								style={styles.buttonGradient}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
							>
								<Button
									mode='contained'
									onPress={handleSubmit}
									style={styles.submitButton}
									labelStyle={styles.submitButtonText}
									contentStyle={styles.submitButtonContent}
								>
									{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
								</Button>
							</LinearGradient>
						</Card.Content>
					</Card>

					<View style={styles.toggleContainer}>
						<Text style={styles.toggleText}>
							{isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
						</Text>
						<Button mode='text' onPress={toggleMode} labelStyle={styles.toggleButtonText}>
							{isLogin ? 'Regístrate' : 'Inicia sesión'}
						</Button>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	keyboardView: {
		flex: 1,
	},
	scrollContainer: {
		flexGrow: 1,
		justifyContent: 'center',
		paddingHorizontal: 24,
		paddingVertical: 32,
	},
	header: {
		alignItems: 'center',
		marginBottom: 32,
	},
	logoContainer: {
		marginBottom: 24,
	},
	logoGradient: {
		width: 80,
		height: 80,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#8B5CF6',
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.3,
		shadowRadius: 16,
		elevation: 8,
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#FFFFFF',
		marginBottom: 8,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 16,
		color: '#94A3B8',
		textAlign: 'center',
	},
	card: {
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		borderRadius: 24,
		marginBottom: 24,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.2)',
	},
	cardContent: {
		padding: 24,
	},
	input: {
		marginBottom: 16,
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
	},
	forgotPasswordContainer: {
		alignItems: 'flex-end',
		marginBottom: 24,
	},
	forgotPasswordText: {
		color: '#A78BFA',
		fontSize: 14,
	},
	buttonGradient: {
		borderRadius: 12,
		marginBottom: 24,
		shadowColor: '#8B5CF6',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 4,
	},
	submitButton: {
		backgroundColor: 'transparent',
	},
	submitButtonContent: {
		paddingVertical: 8,
	},
	submitButtonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: 'bold',
	},
	dividerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 24,
	},
	divider: {
		flex: 1,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
	},
	dividerText: {
		color: '#94A3B8',
		fontSize: 14,
		paddingHorizontal: 16,
	},
	socialContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 12,
	},
	socialButton: {
		flex: 1,
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		borderColor: 'rgba(255, 255, 255, 0.3)',
	},
	socialButtonText: {
		color: '#FFFFFF',
	},
	toggleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	toggleText: {
		color: '#94A3B8',
		fontSize: 14,
	},
	toggleButtonText: {
		color: '#A78BFA',
		fontSize: 14,
		fontWeight: 'bold',
	},
});

export default LoginScreen;
