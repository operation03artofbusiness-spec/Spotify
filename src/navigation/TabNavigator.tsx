import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@/screens/HomeScreen';
import { SearchScreen } from '@/screens/SearchScreen';
import { LibraryScreen } from '@/screens/LibraryScreen';
import { colors } from '@/constants/theme';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
    </Tab.Navigator>
  );
};
