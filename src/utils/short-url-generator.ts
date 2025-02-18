import { Request } from 'express';

export function generateShortUrl(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}

export function convertToHyphenated(str: string): string {
  return str.split(' ').join('-');
}

export function getUpdateParams(req: Request) {
  const { id } = req.params;
  const { url, customName } = req.body;
  return { id, url, customName };
}
