//外部APIアクセス用モジュール

//認証トークンの発行
import fetch from 'node-fetch';
import path from 'path';
import {fileURLToPath} from 'url';
import('dotenv/config');

const getAuthTokenId = async () => {
  try {
    const response = await fetch('https://api.jquants.com/v1/token/auth_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"mailaddress": process.env.mailaddress, "password": process.env.password})
    });
    const data = await response.json();
    return data.refreshToken;
  } catch (error) {
    console.error('Error:', error);
  }
}

const getToken = async (refToken) => {
  try {
    const params = new URLSearchParams({refreshtoken: refToken});
    const url = 'https://api.jquants.com/v1/token/auth_refresh?' + params.toString();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

// 1. 検索処理＝銘柄一覧取得処理時にJ-Quantsから財務データと時価を取得
// 2. Redisに保存
export function getMarketPrice(code: string){

}