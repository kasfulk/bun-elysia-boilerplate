export class PublicServices {
  checkServices() {
    return {
      message: 'Hello from public services!',
    };
  }

  apiTrial() {
    return {
      code: 200,
      message: 'Hello from api trial!',
    };
  }
}
