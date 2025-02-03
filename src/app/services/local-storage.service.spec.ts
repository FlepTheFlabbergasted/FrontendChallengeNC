import { TestBed } from '@angular/core/testing';
import { WINDOW } from '../injection-tokens';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  const windowMock = {
    localStorage: { setItem: jest.fn(), getItem: jest.fn((): string | null => null) },
  };
  const localStorageKey = 'localStorageKey';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: WINDOW, useValue: windowMock }],
    });
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setSavedState', () => {
    it('should call setItem on window localStorage', () => {
      service.setSavedState(localStorageKey, 'hello there');

      expect(windowMock.localStorage.setItem).toHaveBeenCalledWith(localStorageKey, 'hello there');
    });
  });

  describe('getSavedState', () => {
    it('should call getItem on window localStorage and return null if no such key exists', () => {
      const savedState = service.getSavedState(localStorageKey);

      expect(windowMock.localStorage.getItem).toHaveBeenCalledWith(
        localStorageKey,
        'general kenobi',
      );
      expect(savedState).toBeNull();
    });

    it('should call getItem on window localStorage and return stored value', () => {
      windowMock.localStorage.getItem.mockReturnValue('stored value');
      const savedState = service.getSavedState(localStorageKey);

      expect(windowMock.localStorage.getItem).toHaveBeenCalledWith(
        localStorageKey,
        'general kenobi',
      );
      expect(savedState).toBe('stored value');
    });
  });
});
