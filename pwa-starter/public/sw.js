// Workbox 라이브러리를 불러와서 서비스워커에 기능 추가
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/7.3.0/workbox-sw.js'
);

// 이 아래부터는 위젯 전용 사용자 정의 서비스 워커 코드입니다.

// 위젯이 설치되었을 때 초기 데이터를 위젯에 전달
self.addEventListener('widgetinstall', (event) => {
  event.waitUntil(updateWidget(event));
});

// 위젯이 다시 보여질 때 데이터를 최신 상태로 갱신
self.addEventListener('widgetresume', (event) => {
  event.waitUntil(updateWidget(event));
});

// 위젯 내에서 사용자가 특정 버튼(예: 이름 변경)을 눌렀을 때 처리
self.addEventListener('widgetclick', (event) => {
  if (event.action == 'updateName') {
    event.waitUntil(updateName(event));
  }
});

// 위젯이 삭제되었을 때 정리 작업을 할 수 있는 자리 (현재는 미사용)
self.addEventListener('widgetuninstall', (event) => {});

// 위젯의 템플릿과 데이터를 받아 위젯을 갱신하는 함수
const updateWidget = async (event) => {
  const widgetDefinition = event.widget.definition;

  const payload = {
    template: JSON.stringify(
      await (await fetch(widgetDefinition.msAcTemplate)).json()
    ),
    data: JSON.stringify(await (await fetch(widgetDefinition.data)).json()),
  };

  await self.widgets.updateByInstanceId(event.instanceId, payload);
};

// 사용자가 이름을 입력했을 때 그 값을 기반으로 위젯 내용을 갱신하는 함수
const updateName = async (event) => {
  const name = event.data.json().name;
  const widgetDefinition = event.widget.definition;

  const payload = {
    template: JSON.stringify(
      await (await fetch(widgetDefinition.msAcTemplate)).json()
    ),
    data: JSON.stringify({ name }),
  };

  await self.widgets.updateByInstanceId(event.instanceId, payload);
};

// Workbox가 자동으로 생성한 정적 리소스 목록을 사전 캐싱하여 오프라인에서도 사용 가능하게 함
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

