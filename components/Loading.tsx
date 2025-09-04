import { ActivityIndicator } from 'react-native-paper';

export function Loading({ ...rest }: any) {
	return <ActivityIndicator animating={true} className='text-primary' {...rest} />;
}
