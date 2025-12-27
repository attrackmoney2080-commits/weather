// Weather.js - TempLook 실시간 날씨 기반 옷차림 추천

const API_KEY = 'e428e25935e2f8f74b3db63622f3eed2';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// 옷차림 추천 데이터
const clothingRecommendations = {
    veryHot: {
        text: '민소매, 반팔, 반바지, 원피스',
        emoji: '🥵',
        warning: '⚠️ 폭염 주의!',
        image: '8.png',
        bgClass: 'temp-very-hot'
    },
    hot: {
        text: '반팔, 얇은 셔츠, 반바지, 면바지',
        emoji: '☀️',
        image: '7.png',
        bgClass: 'temp-hot'
    },
    warm: {
        text: '긴팔 티셔츠, 가디건, 후드티, 면바지, 슬랙스',
        emoji: '😊',
        image: '6.png',
        bgClass: 'temp-warm'
    },
    mild: {
        text: '니트, 가디건, 맨투맨, 청바지, 면바지',
        emoji: '🧥',
        image: '5.png',
        bgClass: 'temp-mild'
    },
    cool: {
        text: '자켓, 가디건, 야상, 스타킹, 청바지, 면바지',
        emoji: '🧥',
        image: '4.png',
        bgClass: 'temp-cool'
    },
    cold: {
        text: '자켓, 트렌치코트, 야상, 니트, 청바지, 스타킹',
        emoji: '🧣',
        image: '3.png',
        bgClass: 'temp-cold'
    },
    veryCold: {
        text: '코트, 가죽 자켓, 히트텍, 니트, 레깅스',
        emoji: '🧥',
        image: '2.png',
        bgClass: 'temp-very-cold'
    },
    freezing: {
        text: '패딩, 두꺼운 코트, 목도리, 기모제품',
        emoji: '🧤',
        warning: '⚠️ 한파 주의!',
        image: '1.png',
        bgClass: 'temp-freezing'
    }
};

let currentTemperature = null;

// 기온에 따른 배경색 설정
function setBackgroundByTemperature(temp) {
    const body = document.body;
    body.className = body.className.replace(/temp-\w+/g, '');
    
    if (temp >= 28) {
        body.classList.add('temp-very-hot');
    } else if (temp >= 23 && temp <= 27) {
        body.classList.add('temp-hot');
    } else if (temp >= 20 && temp <= 22) {
        body.classList.add('temp-warm');
    } else if (temp >= 17 && temp <= 19) {
        body.classList.add('temp-mild');
    } else if (temp >= 12 && temp <= 16) {
        body.classList.add('temp-cool');
    } else if (temp >= 9 && temp <= 11) {
        body.classList.add('temp-cold');
    } else if (temp >= 5 && temp <= 8) {
        body.classList.add('temp-very-cold');
    } else {
        body.classList.add('temp-freezing');
    }
}

// 기온에 따른 옷차림 추천
function getClothingRecommendation(temp) {
    if (temp >= 28) {
        return clothingRecommendations.veryHot;
    } else if (temp >= 23 && temp <= 27) {
        return clothingRecommendations.hot;
    } else if (temp >= 20 && temp <= 22) {
        return clothingRecommendations.warm;
    } else if (temp >= 17 && temp <= 19) {
        return clothingRecommendations.mild;
    } else if (temp >= 12 && temp <= 16) {
        return clothingRecommendations.cool;
    } else if (temp >= 9 && temp <= 11) {
        return clothingRecommendations.cold;
    } else if (temp >= 5 && temp <= 8) {
        return clothingRecommendations.veryCold;
    } else {
        return clothingRecommendations.freezing;
    }
}

// 날씨 아이콘 URL 생성
function getWeatherIconUrl(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// 날씨 설명을 한글로 변환
function translateWeatherDescription(description) {
    const translations = {
        'clear sky': '맑음',
        'few clouds': '구름 조금',
        'scattered clouds': '구름 낀 날씨',
        'broken clouds': '흐린 날씨',
        'shower rain': '소나기',
        'rain': '비',
        'thunderstorm': '천둥번개',
        'snow': '눈',
        'mist': '안개',
        'fog': '안개',
        'haze': '연무',
        'dust': '먼지',
        'sand': '모래',
        'ash': '재',
        'squall': '돌풍',
        'tornado': '토네이도',
        'overcast clouds': '흐림'
    };
    
    return translations[description.toLowerCase()] || description;
}

// 에러 메시지 표시
function showError(message) {
    $('#loading').addClass('hidden');
    $('#weather-info').addClass('hidden');
    $('#clothing-recommendation').addClass('hidden');
    $('#error-message').removeClass('hidden');
    $('#error-text').text(message);
}

// 옷차림 추천 팁 생성
function getRecommendationTip(temp, windSpeed, humidity) {
    let tips = [];
    
    if (windSpeed > 5) {
        tips.push('바람이 강하니 겉옷을 챙기시는 것을 추천합니다');
    }
    
    if (humidity < 30) {
        tips.push('습도가 낮아 피부 관리에 주의하세요');
    }
    
    if (temp >= 28) {
        tips.push('충분한 수분 섭취를 자주 해주세요');
        tips.push('자외선 차단제를 꼼꼼히 발라 주세요');
        tips.push('모자나 양산을 이용해 햇볕을 피하세요');
    } else if (temp >= 23 && temp <= 27) {
        tips.push('가벼운 옷차림으로 시원하게 입으세요');
        tips.push('자외선 차단은 잊지 마세요');
        tips.push('모자나 선글라스를 착용하면 좋습니다');
    } else if (temp >= 20 && temp <= 22) {
        tips.push('아침저녁 기온 차이에 대비해 얇은 겉옷을 준비하세요');
        tips.push('가벼운 가디건이나 후드티를 챙기세요');
    } else if (temp >= 17 && temp <= 19) {
        tips.push('가벼운 외투나 가디건을 착용하세요');
        tips.push('온도 변화에 대비할 수 있도록 준비하세요');
    } else if (temp >= 12 && temp <= 16) {
        tips.push('자켓이나 얇은 코트를 착용하세요');
        tips.push('목도리나 스카프를 준비하시면 좋습니다');
    } else if (temp >= 9 && temp <= 11) {
        tips.push('따뜻한 자켓이나 트렌치코트를 착용하세요');
        tips.push('장갑과 목도리를 함께 챙기세요');
    } else if (temp >= 5 && temp <= 8) {
        tips.push('두꺼운 코트나 자켓을 착용하세요');
        tips.push('장갑, 목도리, 귀마개 등 보온용품을 착용하세요');
    } else if (temp <= 4) {
        tips.push('외출 시 반드시 장갑과 목도리를 착용하세요');
        tips.push('귀마개, 마스크, 발열내의 등 보온용품을 함께 사용하세요');
    }
    
    return tips.length > 0 ? tips : ['날씨가 좋네요! 즐거운 하루 보내세요'];
}

// 날씨 정보 표시
function displayWeather(weatherData) {
    const temp = Math.round(weatherData.main.temp);
    const feelsLike = Math.round(weatherData.main.feels_like);
    const humidity = weatherData.main.humidity;
    const windSpeed = Math.round(weatherData.wind.speed * 3.6);
    const cityName = weatherData.name;
    const description = translateWeatherDescription(weatherData.weather[0].description);
    const iconCode = weatherData.weather[0].icon;

    currentTemperature = temp;

    setBackgroundByTemperature(temp);

    $('#city-name').text(cityName);
    $('#temperature').text(`${temp}°C`);
    $('#feels-like').text(`체감온도: ${feelsLike}°C`);
    $('#weather-description').text(description);
    $('#humidity').text(`${humidity}%`);
    $('#wind-speed').text(`${windSpeed}km/h`);
    $('#weather-icon-img').attr('src', getWeatherIconUrl(iconCode));
    $('#weather-icon-img').attr('alt', `${cityName} 지역의 현재 날씨: ${description}, 온도 ${temp}°C`);

    const recommendation = getClothingRecommendation(temp);
    let recommendationText = `${recommendation.emoji} ${recommendation.text}`;
    if (recommendation.warning) {
        recommendationText += ` ${recommendation.warning}`;
    }
    $('#recommendation-text').text(recommendationText);
    
    const imageAlt = `${temp}°C 날씨에 맞는 옷차림 추천 이미지 - ${recommendation.text}`;
    const imageSrc = 'assets/images/' + recommendation.image;
    const $img = $('#recommendation-image');
    $img.attr('src', imageSrc);
    $img.attr('alt', imageAlt);
    $img.off('load error').on('load', function() {
        $(this).removeClass('hidden').css('display', 'block');
    }).on('error', function() {
        console.error('이미지를 로드할 수 없습니다:', imageSrc);
        $(this).addClass('hidden');
    });
    // 이미지가 이미 캐시에 있는 경우를 대비
    if ($img[0].complete && $img[0].naturalHeight !== 0) {
        $img.removeClass('hidden').css('display', 'block');
    }
    
    const tips = getRecommendationTip(temp, windSpeed, humidity);
    if (Array.isArray(tips)) {
        $('#recommendation-tip').html(tips.map(tip => `<div class="tip-item">${tip}</div>`).join(''));
    } else {
        $('#recommendation-tip').html(`<div class="tip-item">${tips}</div>`);
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });

    $('#temperature-preview').val('auto');

    $('#loading').addClass('hidden');
    $('#weather-info').removeClass('hidden');
    $('#clothing-recommendation').removeClass('hidden');
    $('#info-section').removeClass('hidden');
    $('#error-message').addClass('hidden');
}

// OpenWeatherMap API 호출 (위도/경도)
function fetchWeather(lat, lon) {
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        showError('API 키가 설정되지 않았습니다. script.js 파일에서 API_KEY를 설정해주세요.');
        return;
    }

    const url = `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;
    
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            displayWeather(data);
        },
        error: function(xhr, status, error) {
            console.error('API 호출 실패 (위치 기반):', error);
            
            fetchWeatherByCity('Seoul', 'kr');
        }
    });
}

// OpenWeatherMap API 호출 (도시명)
function fetchWeatherByCity(cityName, countryCode) {
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        showError('API 키가 설정되지 않았습니다. script.js 파일에서 API_KEY를 설정해주세요.');
        return;
    }

    const url = `${API_URL}?q=${cityName},${countryCode}&appid=${API_KEY}&units=metric&lang=kr`;

    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            displayWeather(data);
        },
        error: function(xhr, status, error) {
            console.error('API 호출 실패:', error);
            
            let errorMessage = '날씨 정보를 가져오는데 실패했습니다.';
            if (xhr.status === 401) {
                errorMessage = 'API 키가 유효하지 않습니다. API 키를 확인해주세요.';
            } else if (xhr.status === 404) {
                errorMessage = '날씨 정보를 찾을 수 없습니다.';
            } else if (xhr.status === 429) {
                errorMessage = 'API 호출 한도를 초과했습니다. 잠시 후 다시 시도해주세요.';
            } else if (xhr.status === 0) {
                errorMessage = '인터넷 연결을 확인해주세요.';
            }
            
            showError(errorMessage);
        }
    });
}

// 온도별 옷차림 미리보기 함수
function previewClothingByTemperature(temperature) {
    const temp = parseInt(temperature);
    const recommendation = getClothingRecommendation(temp);
    let recommendationText = `${recommendation.emoji} ${recommendation.text}`;
    if (recommendation.warning) {
        recommendationText += ` ${recommendation.warning}`;
    }
    
    $('#recommendation-text').text(recommendationText);
    
    const imageAlt = `${temp}°C 날씨에 맞는 옷차림 추천 이미지 - ${recommendation.text}`;
    const imageSrc = 'assets/images/' + recommendation.image;
    const $img = $('#recommendation-image');
    $img.attr('src', imageSrc);
    $img.attr('alt', imageAlt);
    $img.off('load error').on('load', function() {
        $(this).removeClass('hidden').css('display', 'block');
    }).on('error', function() {
        console.error('이미지를 로드할 수 없습니다:', imageSrc);
        $(this).addClass('hidden');
    });
    // 이미지가 이미 캐시에 있는 경우를 대비
    if ($img[0].complete && $img[0].naturalHeight !== 0) {
        $img.removeClass('hidden').css('display', 'block');
    }
    
    setBackgroundByTemperature(temp);
    
    const tips = getRecommendationTip(temp, 3, 50);
    if (Array.isArray(tips)) {
        $('#recommendation-tip').html(tips.map(tip => `<div class="tip-item">${tip}</div>`).join(''));
    } else {
        $('#recommendation-tip').html(`<div class="tip-item">${tips}</div>`);
    }
    
    $('#clothing-recommendation').removeClass('hidden');
}

// 페이지 로드 시 실행
$(document).ready(function() {
    $('#loading').removeClass('hidden');
    
    $('#temperature-preview').on('change', function() {
        const selectedTemp = $(this).val();
        if (selectedTemp === 'auto') {
            if (currentTemperature !== null) {
                previewClothingByTemperature(currentTemperature);
                $('#temperature-preview').val('auto');
            }
        } else {
            previewClothingByTemperature(selectedTemp);
        }
    });
    
    // 서울 날씨를 기본값으로 표시
    fetchWeatherByCity('Seoul', 'kr');
    
    // 위치 정보도 시도
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeather(lat, lon);
            },
            function(error) {
                console.log('위치 정보를 사용할 수 없어 서울 날씨를 표시합니다.');
            },
            {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 300000
            }
        );
    }
});

