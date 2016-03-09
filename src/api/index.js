'use strict';

import Strongloop from './strongloop';

export default function APIFactory(token = null) {
    return new Strongloop(token);
}
