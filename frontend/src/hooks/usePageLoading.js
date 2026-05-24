import { useNavigation } from 'react-router-dom';

export const usePageLoading = () => {
    const navigation = useNavigation();
    return navigation.state === "loading";
};