import { Injectable } from '@nestjs/common';

export class MailService {
  send() {
    // Anggap aja library punya orang
    console.info('Send Email');
  }
}

export const mailService = new MailService();
