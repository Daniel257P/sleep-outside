export default class Alert {
  constructor() {
    this.path = "./json/alerts.json";
  }

  async init(){
    const alerts = await this.getAlerts();

    if(alerts.length > 0) {
    this.renderAlerts(alerts);
  } 
}

    async getAlerts() {
        try {
            const response = await fetch(this.path);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data || [];
        } catch (error) {
            return [];
        }
    }

    renderAlerts(alerts) {
        const alertSection = document.createElement("section");
        alertSection.classList.add("alert-list");
        alerts.forEach(alert => {
            const p = document.createElement("p");
            p.textContent = alert.message;
            p.style.backgroundColor = alert.backgroundColor;
            p.style.color = alert.textColor;
            p.style.padding = "10px";
            p.style.margin = "0";

            alertSection.appendChild(p);
        });
       
        const main = document.querySelector("main");
        main.prepend(alertSection);
    }
}