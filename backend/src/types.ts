export {};

declare global {
  namespace Express {
    interface Request {
      email: any;
      isAdmin: any;
      isTrainer: any;
      isMatchLeader: any;
    }
  }
}
