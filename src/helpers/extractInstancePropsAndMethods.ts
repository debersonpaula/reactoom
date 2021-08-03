/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { ReactoomDependency } from '../store/ReactoomDependency';

export function extractInstanceProps(instance: any): IProps {
  const result: IProps = {
    methods: [],
    values: [],
    deps: [],
  };

  Object.getOwnPropertyNames(instance).forEach((propName) => {
    const property = instance[propName];
    if (typeof property === 'function') {
      result.methods.push(propName);
    } else if (property instanceof ReactoomDependency) {
      result.deps.push(propName);
    } else {
      result.values.push(propName);
    }
  });

  result.methods.push(...extractPropMethods(instance));

  // removed duplicates generated by extendable models
  result.methods = removeDuplicates(result.methods);

  return result;
}

function extractPropMethods(instance: any) {
  const list: string[] = [];

  const proto = instance.__proto__;

  if (proto && proto.constructor.name !== 'Object') {
    Object.getOwnPropertyNames(proto).forEach((propName) => {
      if (propName !== 'constructor' && propName !== '__reactstandin__regenerateByEval') {
        list.push(propName);
      }
    });

    list.push(...extractPropMethods(proto));
  }

  return list;
}

function removeDuplicates(a: string[]) {
  const seen = {};
  const out = [];
  const len = a.length;
  let j = 0;
  for (let i = 0; i < len; i++) {
    const item = a[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}

interface IProps {
  methods: string[];
  values: string[];
  deps: string[];
}
