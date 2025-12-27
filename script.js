// OpenWeatherMap API 키 (실제 사용 시 발급받은 API 키로 교체해야 합니다)
const API_KEY = 'e428e25935e2f8f74b3db63622f3eed2';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// 옷차림 추천 데이터
const clothingRecommendations = {
    veryHot: {
        text: '민소매, 반팔, 반바지, 원피스',
        emoji: '🥵',
        warning: '⚠️ 폭염 주의!',
        image: '8.png'
    },
    hot: {
        text: '반팔, 얇은 셔츠, 반바지, 면바지',
        emoji: '☀️',
        image: '7.png'
    },
    warm: {
        text: '긴팔 티셔츠, 가디건, 후드티, 면바지, 슬랙스',
        emoji: '😊',
        image: '6.png'
    },
    mild: {
        text: '니트, 가디건, 맨투맨, 청바지, 면바지',
        emoji: '🧥',
        image: '5.png'
    },
    cool: {
        text: '자켓, 가디건, 야상, 스타킹, 청바지, 면바지',
        emoji: '🧥',
        image: '4.png'
    },
    cold: {
        text: '자켓, 트렌치코트, 야상, 니트, 청바지, 스타킹',
        emoji: '🧣',
        image: '3.png'
    },
    veryCold: {
        text: '코트, 가죽 자켓, 히트텍, 니트, 레깅스',
        emoji: '🧥',
        image: '2.png'
    },
    freezing: {
        text: '패딩, 두꺼운 코트, 목도리, 기모제품',
        emoji: '🧤',
        warning: '⚠️ 한파 주의!',
        image: '1.png'
    }
};

// 기온에 따른 배경색 설정
function setBackgroundByTemperature(temp) {
    const body = document.body;
    body.classList.remove('hot', 'warm', 'mild', 'cold');
    
    if (temp >= 28) {
        body.classList.add('hot');
    } else if (temp >= 15 && temp <= 27) {
        body.classList.add('warm');
    } else if (temp >= 5 && temp <= 14) {
        body.classList.add('mild');
    } else {
        body.classList.add('cold');
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
        tips.push('실내외 온도 차이에 주의하세요');
    } else if (temp >= 17 && temp <= 19) {
        tips.push('가벼운 외투나 가디건을 착용하세요');
        tips.push('온도 변화에 대비할 수 있도록 준비하세요');
        tips.push('얇은 스카프를 하나 챙기시면 좋습니다');
    } else if (temp >= 12 && temp <= 16) {
        tips.push('자켓이나 얇은 코트를 착용하세요');
        tips.push('목도리나 스카프를 준비하시면 좋습니다');
        tips.push('가벼운 장갑을 챙기시는 것도 좋습니다');
    } else if (temp >= 9 && temp <= 11) {
        tips.push('따뜻한 자켓이나 트렌치코트를 착용하세요');
        tips.push('장갑과 목도리를 함께 챙기세요');
        tips.push('두꺼운 양말을 신는 것을 추천합니다');
    } else if (temp >= 5 && temp <= 8) {
        tips.push('두꺼운 코트나 자켓을 착용하세요');
        tips.push('장갑, 목도리, 귀마개 등 보온용품을 착용하세요');
        tips.push('발열내의나 히트텍을 입으시면 더욱 좋습니다');
    } else if (temp <= 4) {
        tips.push('외출 시 반드시 장갑과 목도리를 착용하세요');
        tips.push('귀마개, 마스크, 발열내의 등 보온용품을 함께 사용하세요');
    }
    
    return tips.length > 0 ? tips : ['날씨가 좋네요! 즐거운 하루 보내세요'];
}

// 날씨 정보 표시
function displayWeather(weatherData) {
    const temp = Math.round(weatherData.main.temp); // 섭씨로 변환됨
    const feelsLike = Math.round(weatherData.main.feels_like); // 체감온도
    const humidity = weatherData.main.humidity; // 습도
    const windSpeed = Math.round(weatherData.wind.speed * 3.6); // m/s를 km/h로 변환
    const cityName = weatherData.name;
    const description = translateWeatherDescription(weatherData.weather[0].description);
    const iconCode = weatherData.weather[0].icon;

    // 현재 온도 저장
    currentTemperature = temp;

    // 배경색 설정
    setBackgroundByTemperature(temp);

    // 날씨 정보 업데이트
    $('#city-name').text(cityName);
    $('#temperature').text(`${temp}°C`);
    $('#feels-like').text(`체감온도: ${feelsLike}°C`);
    $('#weather-description').text(description);
    $('#humidity').text(`${humidity}%`);
    $('#wind-speed').text(`${windSpeed}km/h`);
    $('#weather-icon-img').attr('src', getWeatherIconUrl(iconCode));
    $('#weather-icon-img').attr('alt', `${cityName} 지역의 현재 날씨: ${description}, 온도 ${temp}°C`);

    // 옷차림 추천
    const recommendation = getClothingRecommendation(temp);
    let recommendationText = `${recommendation.emoji} ${recommendation.text}`;
    if (recommendation.warning) {
        recommendationText += ` ${recommendation.warning}`;
    }
    $('#recommendation-text').text(recommendationText);
    
    // 추천 이미지 표시 (온도별 이미지)
    const imageAlt = `${temp}°C 날씨에 맞는 옷차림 추천 이미지 - ${recommendation.text}`;
    $('#recommendation-image').attr('src', 'assets/images/' + recommendation.image);
    $('#recommendation-image').attr('alt', imageAlt);
    $('#recommendation-image').removeClass('hidden');
    
    // 추천 팁 추가
    const tips = getRecommendationTip(temp, windSpeed, humidity);
    if (Array.isArray(tips)) {
        // 배열인 경우 각 팁을 한 줄씩 표시
        $('#recommendation-tip').html(tips.map(tip => `<div class="tip-item">${tip}</div>`).join(''));
    } else {
        // 문자열인 경우 그대로 표시
        $('#recommendation-tip').html(`<div class="tip-item">${tips}</div>`);
    }

    // 업데이트 시간
    const now = new Date();
    const timeString = now.toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    const isoDateTime = now.toISOString();
    $('#update-time').text(timeString);
    $('#update-time').attr('datetime', isoDateTime);

    // 온도 선택 드롭다운을 'auto'로 설정
    $('#temperature-preview').val('auto');

    // 화면 표시
    $('#loading').addClass('hidden');
    $('#weather-info').removeClass('hidden');
    $('#clothing-recommendation').removeClass('hidden');
    $('#info-section').removeClass('hidden');
    $('#error-message').addClass('hidden');
}

// OpenWeatherMap API 호출 (위도/경도)
function fetchWeather(lat, lon) {
    const url = `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;
    
    console.log('API 호출 URL (위치 기반):', url.replace(API_KEY, 'API_KEY_HIDDEN'));

    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('API 응답 성공 (위치 기반):', data);
            displayWeather(data);
        },
        error: function(xhr, status, error) {
            console.error('API 호출 실패 (위치 기반):', error);
            console.error('상태 코드:', xhr.status);
            console.error('응답:', xhr.responseText);
            
            // 실패 시 서울 날씨로 시도
            console.log('위치 기반 API 호출 실패, 서울 날씨로 시도합니다.');
            fetchWeatherByCity('Seoul', 'kr');
        }
    });
}

// OpenWeatherMap API 호출 (도시명)
function fetchWeatherByCity(cityName, countryCode) {
    const url = `${API_URL}?q=${cityName},${countryCode}&appid=${API_KEY}&units=metric&lang=kr`;
    
    console.log('API 호출 URL:', url.replace(API_KEY, 'API_KEY_HIDDEN'));

    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('API 응답 성공:', data);
            displayWeather(data);
        },
        error: function(xhr, status, error) {
            console.error('API 호출 실패:', error);
            console.error('상태 코드:', xhr.status);
            console.error('응답 텍스트:', xhr.responseText);
            
            // 응답 JSON 파싱 시도
            let errorDetail = '';
            try {
                const response = JSON.parse(xhr.responseText);
                if (response.message) {
                    errorDetail = response.message;
                    console.error('API 오류 메시지:', response.message);
                }
            } catch (e) {
                console.error('응답 파싱 실패:', e);
            }
            
            let errorMessage = '날씨 정보를 가져오는데 실패했습니다.';
            if (xhr.status === 401) {
                errorMessage = 'API 키가 유효하지 않습니다. API 키를 확인해주세요.\n' + 
                              'OpenWeatherMap에서 API 키가 활성화되었는지 확인하세요.\n' +
                              '새로운 API 키는 활성화까지 몇 시간이 걸릴 수 있습니다.';
            } else if (xhr.status === 404) {
                errorMessage = '날씨 정보를 찾을 수 없습니다.';
            } else if (xhr.status === 429) {
                errorMessage = 'API 호출 한도를 초과했습니다. 잠시 후 다시 시도해주세요.';
            } else if (xhr.status === 0) {
                errorMessage = '인터넷 연결을 확인해주세요.';
            } else if (errorDetail) {
                errorMessage = '오류: ' + errorDetail;
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
    
    // 온도별 이미지 표시
    const imageAlt = `${temp}°C 날씨에 맞는 옷차림 추천 이미지 - ${recommendation.text}`;
    $('#recommendation-image').attr('src', 'assets/images/' + recommendation.image);
    $('#recommendation-image').attr('alt', imageAlt);
    $('#recommendation-image').removeClass('hidden');
    
    // 배경색 설정
    setBackgroundByTemperature(temp);
    
    // 팁 생성 (가상의 값 사용)
    const tips = getRecommendationTip(temp, 3, 50);
    if (Array.isArray(tips)) {
        $('#recommendation-tip').html(tips.map(tip => `<div class="tip-item">${tip}</div>`).join(''));
    } else {
        $('#recommendation-tip').html(`<div class="tip-item">${tips}</div>`);
    }
    
    // 옷차림 추천 섹션 표시
    $('#clothing-recommendation').removeClass('hidden');
}

// 현재 온도로 복원
let currentTemperature = null;

// 페이지 로드 시 실행
$(document).ready(function() {
    // 온도 선택 이벤트 리스너
    $('#temperature-preview').on('change', function() {
        const selectedTemp = $(this).val();
        if (selectedTemp === 'auto') {
            // 현재 온도로 복원하려면 페이지 새로고침하거나 저장된 온도 사용
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
    
    // 위치 정보도 시도 (성공하면 사용자 위치로 업데이트)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeather(lat, lon);
            },
            function(error) {
                // 위치 정보 실패 시 서울 날씨 유지 (이미 표시됨)
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

