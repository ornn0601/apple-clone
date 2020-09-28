/* 모든 애니메이션의 정보의 배열을 제작 */

/* 즉시 실행 함수
- 지역변수로 작업하여 중복을 피한다.
(() => {
})();

function () {
}) ();
*/

(() => {

    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentSecne = 0; // 현재 활성화된 (눈 앞에 보고있는) 씬(scroll-section)

    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0')
            }
        },
        {
            // 1
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentSecne = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentSecne}`);
    }

    function scrollLoop() {
        prevScrollHeight = 0;
        for (let i = 0; i < currentSecne; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentSecne].scrollHeight) {
            currentSecne++;
            // id 갱신
            document.body.setAttribute('id', `show-scene-${currentSecne}`);
        }

        if (yOffset < prevScrollHeight) {
            if (currentSecne === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            currentSecne--;
            // id 갱신
            document.body.setAttribute('id', `show-scene-${currentSecne}`);
        }
    }

    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    // window.addEventListener('DOMContentLoaded', setLayout); // html로드 후 실행

    window.addEventListener('load', setLayout); // 페이지 소스 로드 후 실행
    window.addEventListener('resize', setLayout);

    setLayout();

})();