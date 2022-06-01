/*
 * This file encapsulates the xthree library.
 * It checks if the needed three examples and the library are duplicated.
 */
import { checkDependancy, checkThreeRevision } from "three-js-checker";

// Duplication check

import {Disposer} from "./exports.js";

const PACKAGE_NAME = "three-js-disposer";

checkThreeRevision(PACKAGE_NAME, 130);
checkDependancy(PACKAGE_NAME, "Disposer", Disposer);

// Reexport API

export * from "./exports";
