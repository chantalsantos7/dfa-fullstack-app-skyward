import { expect } from 'chai';
import { saveFavouriteLocationService } from '../src/utils/services';
import { afterEach, beforeEach, it } from 'vitest';
import sinon from 'sinon';

describe('local storage tests', () => {
    let setItemStub;

    beforeEach(() => {
        localStorage.clear();

        setItemStub = sinon.stub(window.localStorage.__proto__, 'setItem');
    });

    afterEach(() => {
        setItemStub.restore();
    });

    it('should save to the favouriteLocations object in LocalStorage', () => {
        const location = 'Dublin';
        saveFavouriteLocationService(location);

        // Check if setItem was called with the correct arguments
        expect(setItemStub.args[0][0]).to.equal('favouriteLocations');
        expect(setItemStub.args[0][1]).to.equal(JSON.stringify([ location ]));
    });
})