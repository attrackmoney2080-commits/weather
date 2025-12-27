# 오늘 뭐 입지? - 날씨 기반 옷차림 추천 서비스

실시간 날씨 정보를 기반으로 오늘 입을 옷을 추천해드리는 웹 애플리케이션입니다.

## 주요 기능

- 🌤️ **실시간 날씨 정보**: OpenWeatherMap API를 통한 현재 위치 기반 날씨 정보 제공
- 👗 **기온별 옷차림 추천**: 8가지 온도 구간별 맞춤형 옷차림 추천
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기 지원
- 🎨 **직관적인 UI**: 날씨에 따라 변하는 배경색과 시각적 피드백

## 기술 스택

- HTML5
- CSS3
- JavaScript (jQuery)
- OpenWeatherMap API

## SEO 최적화

이 프로젝트는 검색 엔진 최적화(SEO)가 적용되어 있습니다:

### 메타 태그
- Title, Description, Keywords 메타 태그
- Open Graph 태그 (Facebook, LinkedIn 등)
- Twitter Cards 태그
- Robots 메타 태그
- Canonical URL

### 구조화된 데이터 (Schema.org)
- WebApplication 스키마
- WebSite 스키마
- FAQPage 스키마

### 접근성
- ARIA 레이블 및 역할 속성
- 시맨틱 HTML5 태그 (article, section, aside, dl, dt, dd)
- 스킵 링크 (키보드 접근성)
- 적절한 이미지 alt 텍스트

### 성능 최적화
- Preconnect를 통한 리소스 사전 연결
- 이미지 lazy loading
- 캐싱 설정 (.htaccess)

### 기타
- robots.txt
- sitemap.xml
- 모바일 친화적 반응형 디자인

## 설치 및 실행

1. 저장소 클론
```bash
git clone https://github.com/your-username/weather.git
cd weather
```

2. OpenWeatherMap API 키 발급
   - [OpenWeatherMap](https://openweathermap.org/api)에서 무료 API 키 발급
   - `script.js` 파일의 `API_KEY` 변수에 API 키 입력

3. 로컬 서버 실행
   - Python: `python -m http.server 8000`
   - Node.js: `npx serve`
   - 또는 다른 웹 서버 사용

4. 브라우저에서 접속
   - `http://localhost:8000` (포트 번호는 사용한 서버에 따라 다름)

## 배포 전 확인사항

- [ ] `index.html`의 Open Graph 이미지 URL을 실제 도메인으로 변경
- [ ] `index.html`의 Canonical URL을 실제 도메인으로 변경
- [ ] `robots.txt`의 sitemap URL을 실제 도메인으로 변경
- [ ] `sitemap.xml`의 URL을 실제 도메인으로 변경
- [ ] Open Graph 이미지 (1200x630px) 준비 및 업로드
- [ ] Favicon 및 Apple Touch Icon 준비 및 업로드

## 라이선스

MIT License

## 데이터 제공

이 프로젝트는 [OpenWeatherMap](https://openweathermap.org)의 날씨 데이터를 사용합니다.
