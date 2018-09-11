import { DashbroadModule } from './dashbroad.module';

describe('DashbroadModule', () => {
  let dashbroadModule: DashbroadModule;

  beforeEach(() => {
    dashbroadModule = new DashbroadModule();
  });

  it('should create an instance', () => {
    expect(dashbroadModule).toBeTruthy();
  });
});
