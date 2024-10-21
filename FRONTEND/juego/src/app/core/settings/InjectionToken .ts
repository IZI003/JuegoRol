/*import { HttpClientModule, HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

const loadConfig = () => {
  return firstValueFrom(
    fetch('./appconfig.json').then((response) => response.json())
  );
};

const startApp = async () => {
  const config = await loadConfig();
  appConfig.providers.push({ provide: 'API_CONFIG', useValue: config });

  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
};

startApp();*/