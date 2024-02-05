//外部APIアクセス用モジュール

//認証トークンの発行
import fetch from 'node-fetch';
import {
  formatDateToYYYYMMDD,
  get12WeeksAgoExcludingWeekends,
} from '../utils/common';

import('dotenv/config');

const getAuthTokenId = async () => {
  try {
    const response = await fetch('https://api.jquants.com/v1/token/auth_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mailaddress: process.env.mailaddress,
        password: process.env.password,
      }),
    });
    const data = await response.json();
    return data.refreshToken;
  } catch (error) {
    console.error('Error:', error);
  }
};

const getToken = async (refToken) => {
  try {
    const params = new URLSearchParams({ refreshtoken: refToken });
    const url =
      'https://api.jquants.com/v1/token/auth_refresh?' + params.toString();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
};

// 1. 検索処理＝銘柄一覧取得処理時にJ-Quantsから財務データと時価を取得
// 2. Redisに保存
export async function getMarketPrice(code: string) {
  //API認証トークン取得
  const refreashToken = await getAuthTokenId();
  const tokenId = await getToken(refreashToken);
  const requestParams = {
    code: code,
    date: formatDateToYYYYMMDD(get12WeeksAgoExcludingWeekends()).toString(),
    pagination_key: '',
  };
  const params = new URLSearchParams(requestParams);

  const url =
    'https://api.jquants.com/v1/prices/daily_quotes?' + params.toString();
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tokenId.idToken,
      },
    });
    const res = await response.json();
    return res.daily_quotes;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
}

export async function getFinancialData(code: string) {
  //API認証トークン取得
  const refreashToken = await getAuthTokenId();
  const tokenId = await getToken(refreashToken);

  const requestParams = {
    code: code,
    data: '',
    pagination_key: '',
  };
  const params = new URLSearchParams(requestParams);

  const url = 'https://api.jquants.com/v1/fins/statements?' + params.toString();
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tokenId.idToken,
      },
    });
    const jsonData = await response.json();
    const fyFinancialStatements = jsonData.statements?.filter(
      (statement) =>
        statement.TypeOfDocument ===
          'FYFinancialStatements_Consolidated_IFRS' ||
        statement.TypeOfDocument === 'FYFinancialStatements_Consolidated_JP' ||
        statement.TypeOfDocument === 'FYFinancialStatements_Consolidated_US',
    );

    const sortedStatements = fyFinancialStatements?.sort((a, b) => {
      const dateA = new Date(a.DisclosedDate);
      const dateB = new Date(b.DisclosedDate);
      return dateB.getTime() - dateA.getTime();
    });
    if (!sortedStatements || sortedStatements.length === 0) {
      return null;
    }
    return sortedStatements[0];
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
}
