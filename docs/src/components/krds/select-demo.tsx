"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectGroupLabel,
  SelectSeparator,
  SelectLabel,
  SelectError,
  SelectHelper,
} from "./select";

export function SelectBasicDemo() {
  return (
    <div className="w-full max-w-xs">
      <Select defaultValue="">
        <SelectLabel>소속 기관</SelectLabel>
        <SelectTrigger placeholder="기관을 선택하세요" />
        <SelectContent>
          <SelectItem value="mois">행정안전부</SelectItem>
          <SelectItem value="msit">과학기술정보통신부</SelectItem>
          <SelectItem value="moef">기획재정부</SelectItem>
          <SelectItem value="moe">교육부</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SelectGroupDemo() {
  return (
    <div className="w-full max-w-xs">
      <Select defaultValue="">
        <SelectLabel required>담당 부서</SelectLabel>
        <SelectTrigger placeholder="부서를 선택하세요" />
        <SelectContent>
          <SelectGroup>
            <SelectGroupLabel>행정안전부</SelectGroupLabel>
            <SelectItem value="admin-1">지방자치분권실</SelectItem>
            <SelectItem value="admin-2">디지털정부실</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectGroupLabel>과학기술정보통신부</SelectGroupLabel>
            <SelectItem value="msit-1">정보통신정책실</SelectItem>
            <SelectItem value="msit-2">연구개발정책실</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SelectSizeDemo() {
  return (
    <div className="w-full max-w-xs space-y-4">
      <Select defaultValue="">
        <SelectLabel>Small</SelectLabel>
        <SelectTrigger placeholder="선택" size="sm" />
        <SelectContent>
          <SelectItem value="a">옵션 A</SelectItem>
          <SelectItem value="b">옵션 B</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="">
        <SelectLabel>Medium</SelectLabel>
        <SelectTrigger placeholder="선택" size="md" />
        <SelectContent>
          <SelectItem value="a">옵션 A</SelectItem>
          <SelectItem value="b">옵션 B</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="">
        <SelectLabel>Large</SelectLabel>
        <SelectTrigger placeholder="선택" size="lg" />
        <SelectContent>
          <SelectItem value="a">옵션 A</SelectItem>
          <SelectItem value="b">옵션 B</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SelectErrorDemo() {
  return (
    <div className="w-full max-w-xs">
      <Select defaultValue="">
        <SelectLabel required>민원 유형</SelectLabel>
        <SelectTrigger placeholder="선택하세요" error />
        <SelectContent>
          <SelectItem value="build">건축 허가</SelectItem>
          <SelectItem value="road">도로 보수</SelectItem>
        </SelectContent>
        <SelectError>민원 유형을 선택해주세요.</SelectError>
      </Select>
    </div>
  );
}

export function SelectDisabledDemo() {
  return (
    <div className="w-full max-w-xs space-y-4">
      <Select defaultValue="" disabled>
        <SelectLabel>비활성 셀렉트</SelectLabel>
        <SelectTrigger placeholder="선택 불가" />
        <SelectContent>
          <SelectItem value="a">옵션 A</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="">
        <SelectLabel>일부 옵션 비활성</SelectLabel>
        <SelectTrigger placeholder="선택하세요" />
        <SelectContent>
          <SelectItem value="a">선택 가능</SelectItem>
          <SelectItem value="b" disabled>선택 불가 (비활성)</SelectItem>
          <SelectItem value="c">선택 가능</SelectItem>
        </SelectContent>
        <SelectHelper>일부 옵션은 비활성 상태입니다.</SelectHelper>
      </Select>
    </div>
  );
}
