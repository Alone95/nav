// Copyright @ 2018-2021 xiejiahe. All rights reserved. MIT license.
// See https://github.com/xjh22222228/nav

import config from '../../../../nav.config'
import { Component } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { INavProps, INavThreeProp } from '../../../types'
import {
  fuzzySearch,
  queryString,
  setWebsiteList,
  toggleCollapseAll,
} from '../../../utils'
import { websiteList } from '../../../store'

@Component({
  selector: 'app-home',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export default class HomeComponent {

  constructor (private router: Router, private activatedRoute: ActivatedRoute) {}

  websiteList: INavProps[] = websiteList
  currentList: INavThreeProp[] = []
  id: number = 0
  page: number = 0
  title: string = config.title.trim().split(/\s/)[0]

  ngOnInit() {
    const initList = () => {
      try {
        if (this.websiteList[this.page] && this.websiteList[this.page]?.nav?.length > 0) {
          this.currentList = this.websiteList[this.page].nav[this.id].nav
        } else {
          this.currentList = []
        }
      } catch (error) {
        this.currentList = []
      }
    }

    this.activatedRoute.queryParams.subscribe(() => {
      const { id, page, q } = queryString()
      this.page = page
      this.id = id

      if (q) {
        this.currentList = fuzzySearch(this.websiteList, q)
      } else {
        initList()
      }

      setWebsiteList(this.websiteList)
    })
  }

  handleSidebarNav(page, id) {
    this.websiteList[page].id = id
    this.router.navigate([this.router.url.split('?')[0]], { 
      queryParams: {
        page,
        id,
      }
    })
  }

  onCollapse = (item, index) => {
    item.collapsed = !item.collapsed
    this.websiteList[this.page].nav[this.id].nav[index] = item
    setWebsiteList(this.websiteList)
  }

  onCollapseAll = () => {
    toggleCollapseAll(this.websiteList)
  }

  collapsed() {
    try {
      return websiteList[this.page].nav[this.id].collapsed
    } catch (error) {
      return false
    }
  }
}
