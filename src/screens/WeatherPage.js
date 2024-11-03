import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import CartTopBar from '../components/CartTopBar';
const API_KEY = '4847a8e8b971aada91d76b104b8b2c7c'; // Replace with your API key

export default function WeatherPage({ navigation }) {
    const [location, setLocation] = useState(null);
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [detailedForecast, setDetailedForecast] = useState([]);

    const fetchWeatherData = async (lat, lon) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );
            setWeatherData(response.data);

            const forecastResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );
            const groupedForecast = groupForecastByDay(forecastResponse.data.list);
            setForecast(groupedForecast);
            setSelectedDay(Object.keys(groupedForecast)[0]);
            setDetailedForecast(groupedForecast[Object.keys(groupedForecast)[0]]);
        } catch (error) {
            console.error("Error fetching weather data: ", error);
        }
    };

    const groupForecastByDay = (forecastList) => {
        const grouped = forecastList.reduce((acc, current) => {
            const date = new Date(current.dt * 1000).toLocaleDateString();
            if (!acc[date]) acc[date] = [];
            acc[date].push(current);
            return acc;
        }, {});
        return grouped;
    };

    const getLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            fetchWeatherData(location.coords.latitude, location.coords.longitude);
        } catch (error) {
            console.error("Error getting location: ", error);
        }
    };

    const fetchWeatherByCity = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );
            setWeatherData(response.data);

            const forecastResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
            );
            const groupedForecast = groupForecastByDay(forecastResponse.data.list);
            setForecast(groupedForecast);
            setSelectedDay(Object.keys(groupedForecast)[0]);
            setDetailedForecast(groupedForecast[Object.keys(groupedForecast)[0]]);
        } catch (error) {
            console.error("Error fetching weather data: ", error);
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    const handleDaySelect = (day) => {
        setSelectedDay(day);
        setDetailedForecast(forecast[day]);
    };

    return (

        <View style={styles.container}>
            {/* Search Section */}
            <CartTopBar navigation={navigation} />
            <View style={styles.searchContainer}>
                <Feather name="search" size={24} color="#4CAF50" />
                <TextInput
                    style={styles.input}
                    placeholder="Search for a city..."
                    placeholderTextColor="#A5D6A7"
                    value={city}
                    onChangeText={setCity}
                    onSubmitEditing={fetchWeatherByCity}
                />
            </View>

            {/* Location Button */}
            <TouchableOpacity style={styles.locationButton} onPress={getLocation}>
                <MaterialIcons name="my-location" size={24} color="#ffffff" />
                <Text style={styles.locationButtonText}>Use My Location</Text>
            </TouchableOpacity>

            {/* Current Weather Display */}
            {weatherData && (
                <View style={styles.weatherCard}>
                    <Text style={styles.cityName}>{weatherData.name}, {weatherData.sys.country}</Text>
                    <Text style={styles.temp}>{Math.round(weatherData.main.temp)}°C</Text>
                    <Text style={styles.description}>{weatherData.weather[0].description}</Text>
                    <Text style={styles.details}>Humidity: {weatherData.main.humidity}%</Text>
                    <Text style={styles.details}>Wind: {weatherData.wind.speed} m/s</Text>
                </View>
            )}

            {/* Forecast Slider for Selected Day */}
            <ScrollView horizontal style={styles.forecastContainer} showsHorizontalScrollIndicator={false}>
                {detailedForecast.map((item, index) => (
                    <View key={index} style={styles.forecastItem}>
                        <Text style={styles.forecastTime}>{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                        <Image
                            style={styles.icon}
                            source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
                        />
                        <Text style={styles.forecastTemp}>{Math.round(item.main.temp)}°C</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Upcoming Days List */}
            <ScrollView horizontal style={styles.daysList} showsHorizontalScrollIndicator={false}>
                {Object.keys(forecast).map((day, index) => {
                    const dayForecast = forecast[day];
                    const firstItem = dayForecast[0]; // Get the first item of the day's forecast for highlights
                    const dayTemp = Math.round(firstItem.main.temp);
                    const weatherIcon = firstItem.weather[0].icon;
                    const weatherDescription = firstItem.weather[0].main;
                    const minTemp = Math.min(...dayForecast.map(item => item.main.temp_min));
                    const maxTemp = Math.max(...dayForecast.map(item => item.main.temp_max));
                    const humidity = firstItem.main.humidity;
                    const [dayPart, monthPart, yearPart] = day.split('/');
                    const formattedDate = new Date(`${yearPart}-${monthPart}-${dayPart}T00:00:00`);
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.dayItem, day === selectedDay && styles.selectedDayItem]}
                            onPress={() => handleDaySelect(day)}
                        >

                            <Text style={styles.dayText}>{formattedDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}</Text>
                            <Image
                                style={styles.dayIcon}
                                source={{ uri: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png` }}
                            />
                            <Text style={styles.dayTemp}>{dayTemp}°C</Text>
                            <Text style={styles.dayDescription}>{weatherDescription}</Text>
                            <Text style={styles.minMaxTemp}>Min: {Math.round(minTemp)}°C / Max: {Math.round(maxTemp)}°C</Text>
                            <Text style={styles.humidity}>Humidity: {humidity}%</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F5E9',
        padding: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 20,
        elevation: 3,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#4CAF50',
    },
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        elevation: 3,
    },
    locationButtonText: {
        color: '#ffffff',
        fontSize: 16,
        marginLeft: 5,
    },
    weatherCard: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 4,
        alignItems: 'center',
    },
    cityName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    temp: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    description: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#666',
    },
    details: {
        fontSize: 14,
        color: '#888',
    },
    forecastContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        maxHeight: 120,
    },
    forecastItem: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        margin: 10,
        elevation: 2,
    },
    forecastTime: {
        fontSize: 14,
        color: '#333',
    },
    icon: {
        width: 40,
        height: 40,
    },
    forecastTemp: {
        fontSize: 16,
        color: '#4CAF50',
    },
    daysList: {
        padding: 10,
        maxHeight: 220,
    },
    dayItem: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        elevation: 2,
    },
    selectedDayItem: {
        backgroundColor: '#A5D6A7',
    },
    dayText: {
        fontSize: 16,
        color: '#333',
    },
    dayIcon: {
        width: 40,
        height: 40,
        marginVertical: 5,
    },
    dayTemp: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    dayDescription: {
        fontSize: 14,
        color: '#666',
    },
    minMaxTemp: {
        fontSize: 12,
        color: '#555',
    },
    humidity: {
        fontSize: 12,
        color: '#888',
    },

});
