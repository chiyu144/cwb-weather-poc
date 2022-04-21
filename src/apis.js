const apiHost = 'https://opendata.cwb.gov.tw';
const apiAuth = 'CWB-DC6A757F-5DB3-4D8D-A919-77B3875B0F84';

export const getHoursApi = async () => {
  try {
    const apiUrl = new URL('/api/v1/rest/datastore/F-C0032-001', apiHost);
    apiUrl.searchParams.append('Authorization', apiAuth);
    apiUrl.searchParams.append('locationName', ['臺北市']);
    apiUrl.searchParams.append('sort', 'time');
    const res = await fetch(apiUrl.toString(), { method: 'GET' });
    const data = await res.json();
    if (data.success === 'true') {
      return data;
    } else {
      throw new Error('There is something wrong with Api.');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const getWeeklyApi = async () => {
  try {
    const apiUrl = new URL('/api/v1/rest/datastore/F-D0047-091', apiHost);
    apiUrl.searchParams.append('Authorization', apiAuth);
    const res = await fetch(apiUrl.toString(), { method: 'GET' });
    const data = await res.json();
    if (data.success === 'true') {
      return data;
    } else {
      throw new Error('There is something wrong with Api.');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const getDaysApi = async (params) => {
  try {
    const FORECAST_TWO_DAYS_TAIPEI = 'F-D0047-061';
    const apiUrl = new URL(`/api/v1/rest/datastore/${FORECAST_TWO_DAYS_TAIPEI}`, apiHost);
    apiUrl.search = new URLSearchParams(params);
    apiUrl.searchParams.append('Authorization', apiAuth);
    const res = await fetch(apiUrl.toString());
    const response = await res.json();

    if (response.success === 'true') {
      return response;
    } else {
      throw new Error('There is something wrong with Api.');
    }
  } catch (exception) {
    console.warn(exception);
  }
};

export const getOzoneApi = async () => {
  try {
    const apiUrl = new URL('/api/v1/rest/datastore/O-A0006-002', apiHost);
    apiUrl.searchParams.append('Authorization', apiAuth);
    const res = await fetch(apiUrl.toString(), { method: 'GET' });
    const Ozonedata = await res.json();
    if (Ozonedata.success === 'true') {
      return Ozonedata;
    } else {
      throw new Error('There is something wrong with Api.');
    }
  } catch (err) {
    console.warn(err);
  }
};
