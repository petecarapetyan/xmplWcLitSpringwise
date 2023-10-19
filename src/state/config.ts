import createMatcher from '@captaincodeman/router'
import { routingPluginFactory } from '@captaincodeman/rdx-model'
import * as models from './models'
import { html, TemplateResult } from 'lit-html'

export interface Route {
  name: string
  view: TemplateResult
}

interface Routes { [path: string]: Route }

const routes: Routes = {
  '/': {
    name: 'home',
    view: html`<view-home></view-home>`
  },
  '/about': {
    name: 'about',
    view: html`<view-about></view-about>`,
  },
  '/account': {
    name: 'account',
    view: html`<view-account></view-account>`,
  },
  '/signin': {
    name: 'signin',
    view: html`<view-signin></view-signin>`,
  },
  '/permissions': {
    name: 'permissions',
    view: html`<admin-user-permissions></admin-user-permissions>`,
  },
  //REPLACEMENTS
  '/truckU': {
   name: 'truckU',
   view: html`<view-truck-u></view-truck-u>`,
  },
  '/truckC': {
   name: 'truckC',
   view: html`<view-truck-c></view-truck-c>`,
  },
  '/truckRD': {
   name: 'truckRD',
   view: html`<view-truck-rd></view-truck-rd>`,
  },
  '/airplaneU': {
   name: 'airplaneU',
   view: html`<view-airplane-u></view-airplane-u>`,
  },
  '/airplaneC': {
   name: 'airplaneC',
   view: html`<view-airplane-c></view-airplane-c>`,
  },
  '/airplaneRD': {
   name: 'airplaneRD',
   view: html`<view-airplane-rd></view-airplane-rd>`,
  },
  '/dogU': {
   name: 'dogU',
   view: html`<view-dog-u></view-dog-u>`,
  },
  '/dogC': {
   name: 'dogC',
   view: html`<view-dog-c></view-dog-c>`,
  },
  '/dogRD': {
   name: 'dogRD',
   view: html`<view-dog-rd></view-dog-rd>`,
  },
  '/*': {
    name: '404',
    view: html`<view-404></view-404>`,
  },
}

const matcher = createMatcher(routes)
const routing = routingPluginFactory(matcher)

export const config = { models, plugins: { routing } }
