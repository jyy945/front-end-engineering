import map from 'lodash/map'
import { h } from 'vue'
import { Columns } from '@/types'

export const COLUMNS: Columns = [
  {
    key: 'cname',
    type: 'string',
    width: 140,
    labelId: '姓名',
  },
  {
    key: 'hiredate',
    type: 'date',
    width: 120,
    formate: 'YYYY-MM-DD',
    labelId: '入职时间',
  },
  {
    key: 'orgName',
    type: 'org',
    width: 140,
    labelId: '所属单位',
    formatter: ({ orgJobList }) => map(orgJobList, ({ orgName }) => h('div', orgName || '')),
  },
  {
    key: 'jobName',
    type: 'string',
    width: 140,
    labelId: '岗位',
    formatter: ({ orgJobList }) => map(orgJobList, ({ jobName }) => h('div', jobName || '')),
  },
  {
    key: 'roleName',
    type: 'string',
    width: 140,
    labelId: '角色',
    formatter: ({ roleList }) => map(roleList, ({ roleName }) => h('div', roleName)),
  },
  {
    key: 'gender',
    type: 'option',
    width: 100,
    labelId: '性别',
  },
  {
    key: 'birth',
    type: 'date',
    width: 120,
    formate: 'YYYY-MM-DD',
    labelId: '出生年月',
  },
  {
    key: 'age',
    type: 'string',
    labelId: '年龄',
  },
  {
    key: 'educationBackground',
    type: 'option',
    width: 120,
    labelId: '学历',
  },
  {
    key: 'address',
    type: 'string',
    width: 120,
    labelId: '家庭地址',
  },
  {
    key: 'email',
    type: 'string',
    width: 160,
    labelId: '电子邮箱',
  },
  {
    key: 'phone',
    type: 'string',
    width: 120,
    labelId: '联系方式',
  },
]
