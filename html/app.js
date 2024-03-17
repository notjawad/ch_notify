function adjustHexBrightness(hex, percentage = 0.1) {
  const rgb = parseInt(hex.slice(1), 16);
  const r = Math.floor((rgb >> 16) * percentage);
  const g = Math.floor(((rgb >> 8) & 0xff) * percentage);
  const b = Math.floor((rgb & 0xff) * percentage);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

document.addEventListener('DOMContentLoaded', function () {
  const app = {
    data: {
      Align: '',
      backgroundColor: '',
      activeNotifications: [],
    },
    init() {
      this.bindEvents();
    },
    bindEvents() {
      window.addEventListener('message', (event) => {
        const { message, data } = event.data;

        if (message == 'setData') {
          this.setData(data);
        }

        if (message == 'createNotification') {
          this.createNotification(data);
        }
      });
    },
    setData(data) {
      this.data = { ...this.data, ...data };
    },
    createNotification(data) {
      if (this.data.useNotificationSound) {
        this.playSound();
      }

      this.data.activeNotifications.push({
        title: data.title,
        message: data.message,
        duration: data.duration,
        icon: data.icon,
        color: data.color,
      });

      if (this.data.activeNotifications.length > 1) {
        return;
      }

      const intervalId = setInterval(() => {
        if (this.data.activeNotifications.length === 0) {
          clearInterval(intervalId);
          return;
        }

        this.data.activeNotifications.forEach((element) => {
          if (element.show == null) {
            element.show = true;
            element.divide = element.duration;
          }

          if (element.duration <= 0) {
            element.show = false;
          } else {
            element.progress = 100 - (element.duration / element.divide) * 100;
            element.duration = element.duration - 10;
          }
        });

        this.updateNotifications();
      }, 10);
    },
    updateNotifications() {
      const container = document.querySelector('.notifications-container');
      container.innerHTML = '';

      this.data.activeNotifications.forEach((notification) => {
        if (!notification.show) return;

        const notificationElement = document.createElement('div');
        notificationElement.style.background = this.data.backgroundColor;
        notificationElement.style.width = '450px';
        notificationElement.style.margin = '0.2rem';
        notificationElement.style.borderRadius = '8px';

        let iconBgColor = adjustHexBrightness(notification.color, 0.1);
        let iconBorderColor = adjustHexBrightness(notification.color, 0.15);

        notificationElement.innerHTML = `
            <div 
            class='flex items-center rounded-lg overflow-hidden border border-white/10 px-3 py-2'
            >
              <div class='flex items-center'>
                <div
                class='mr-4 p-2 flex items-center justify-center rounded-md bg-gray-800'
                style='
                background-color: ${iconBgColor}; 
                border: 1px solid ${iconBorderColor};
                box-shadow:  26px 26px 59px ${adjustHexBrightness(notification.color, 0.2)},
                  -26px -26px 59px ${adjustHexBrightness(notification.color, 0.6)};
                '
                >
                    <i class='${notification.icon}' style="color: ${notification.color}; font-size: 2rem;"></i>
                </div>
                <div>
                    <h1 style="color: ${notification.color}; font-weight: bold;">
                        ${notification.title}
                    </h1>
                    <span class='text-zinc-200'>
                        ${marked.parse(notification.message)}
                    </span>
                </div>
              </div>
            </div>
          `;

        container.appendChild(notificationElement);
      });
    },
    playSound() {
      const audio = new Audio('sound.mp3');
      audio.volume = 0.2;
      audio.play();
    },
  };

  app.init();
});
