// 공통 JavaScript - TempLook

// 모바일 메뉴 토글
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            // 햄버거 아이콘 애니메이션
            this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
        
        // 메뉴 링크 클릭 시 모바일 메뉴 닫기
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.textContent = '☰';
                    }
                }
            });
        });
        
        // 모바일에서 드롭다운 메뉴 토글
        const dropdownToggles = navMenu.querySelectorAll('.dropdown > a');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    const dropdown = this.parentElement;
                    const dropdownContent = dropdown.querySelector('.dropdown-content');
                    
                    // 다른 드롭다운 닫기
                    navMenu.querySelectorAll('.dropdown-content.active').forEach(content => {
                        if (content !== dropdownContent) {
                            content.classList.remove('active');
                        }
                    });
                    
                    if (dropdownContent) {
                        dropdownContent.classList.toggle('active');
                        dropdown.classList.toggle('active');
                    }
                }
            });
        });
        
        // 외부 클릭 시 메뉴 닫기
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.textContent = '☰';
                    }
                }
            }
        });
    }

    // 현재 페이지 메뉴 활성화
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // 창 크기 변경 시 모바일 메뉴 초기화
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (mobileMenuToggle) {
                mobileMenuToggle.textContent = '☰';
            }
            // 드롭다운 활성 상태 제거
            const dropdownContents = document.querySelectorAll('.dropdown-content');
            dropdownContents.forEach(content => {
                content.classList.remove('active');
            });
        }
    });
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // href가 "#"만 있거나 유효하지 않은 경우 처리하지 않음
        if (!href || href === '#' || href.length <= 1) {
            return;
        }
        
        e.preventDefault();
        try {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } catch (error) {
            console.error('Invalid selector:', href);
        }
    });
});

