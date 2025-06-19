"use client";
// import ExamDouble from "@/components/Downloads/ExamDouble";
// import ExamSingle from "@/components/Downloads/pdf/PdfExamSingle";
import React from "react";
import ExamSingle from "../exam/list/_components/typeByFile/PdfExamSingle";
import { DownloadData } from "../exam/_utils/data";
import WordExamSingle from "../exam/list/_components/typeByFile/WordExamSingle";
// 여백
// blank: NARROWLY("좁게") | COMMONLY("보통") | WIDELY("넓게");

// 줄 간격
// lineInterval: NARROWLY("좁게") | WIDELY("넓게");

// 글자 크기
// fontSize: MINIMUM("최소") | COMMONLY("보통") | WIDELY("넓게");
const temp = {
  testId: 5,
  testName: "12D:VOCA test",
  examScope: "3-5, 7, 34, 나의 단어",
  totalQuestions: 17,
  layer: "STEP01",
  blank: "NARROWLY",
  lineInterval: "NARROWLY",
  fontSize: "MINIMUM",
  testTime: 100,
  // testDate: "2025-01-01",
  logo: true,
  academyName: "대성학원",
  className: "똑똑반",
  name: "강성심",
  details: [
    {
      testDetailId: 18,
      testType: "Type2",
      questions: [
        {
          content: "엄격한",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "strict",
        },
        {
          content: "옮기다",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "transfer",
        },
        {
          content: "엄격한",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "strict",
        },
        {
          content: "옮기다",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "transfer",
        },
        {
          content: "엄격한",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "strict",
        },
        {
          content: "옮기다",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "transfer",
        },
        {
          content: "엄격한",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "strict",
        },
        {
          content: "옮기다",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "transfer",
        },
        {
          content: "엄격한",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "strict",
        },
        {
          content: "옮기다",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "transfer",
        },
        {
          content: "엄격한",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "strict",
        },
        {
          content: "옮기다",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "transfer",
        },
        {
          content: "엄격한",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "strict",
        },
        {
          content: "옮기다",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "transfer",
        },
        {
          content: "엄격한",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "strict",
        },
        {
          content: "옮기다",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "transfer",
        },
        {
          content: "엄격한",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "strict",
        },
        {
          content: "옮기다",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "transfer",
        },
        {
          content: "엄격한",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "strict",
        },
        {
          content: "옮기다",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "transfer",
        },
        {
          content: "엄격한",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "strict",
        },
        {
          content: "옮기다",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "transfer",
        },
        {
          content: "엄격한",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "strict",
        },
        {
          content: "옮기다",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "transfer",
        },
        {
          content: "엄격한",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "strict",
        },
        {
          content: "옮기다",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "transfer",
        },
        {
          content: "엄격한",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "strict",
        },
        {
          content: "옮기다",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "transfer",
        },
        {
          content: "엄격한",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "strict",
        },
        {
          content: "옮기다",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "transfer",
        },
      ],
    },
    {
      testDetailId: 19,
      testType: "Type3",
      questions: [
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
        {
          content:
            "People celebrate the arrival of the New Year by watching the sun rising on the _______. ",
          koreanMeaning:
            "사람들은 수평선 위로 올라오는 태양을 보며 새해가 온 것을 기념한다.",
          englishExample: null,
          choices: null,
          answer: "horizon",
        },
      ],
    },
    {
      testDetailId: 20,
      testType: "Type4",
      questions: [
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "financial",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
        {
          content:
            "BKS broadcasting station acquired ___ rights to broadcast the Winter Olympic Games.",
          koreanMeaning:
            "BKS 방송국은 동계 올림픽을 방영할 독점적인 권리를 따냈다.",
          englishExample: null,
          choices: "financial, strict, abundant, exclusive",
          answer: "exclusive",
        },
      ],
    },
    {
      testDetailId: 17,
      testType: "Type1",
      questions: [
        {
          content: "financial",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "재정의, 금융의",
        },
        {
          content: "apology",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "사과, 사죄",
        },
        {
          content: "financial",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "재정의, 금융의",
        },
        {
          content: "apology",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "사과, 사죄",
        },
        {
          content: "financial",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "재정의, 금융의",
        },
        {
          content: "apology",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "사과, 사죄",
        },
        {
          content: "financial",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "재정의, 금융의",
        },
        {
          content: "apology",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "사과, 사죄",
        },
        {
          content: "financial",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "재정의, 금융의",
        },
        {
          content: "apology",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "사과, 사죄",
        },
        {
          content: "financial",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "재정의, 금융의",
        },
        {
          content: "apology",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "사과, 사죄",
        },
        {
          content: "financial",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "재정의, 금융의",
        },
        {
          content: "apology",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "사과, 사죄",
        },
        {
          content: "financial",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "재정의, 금융의",
        },
        {
          content: "apology",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "사과, 사죄",
        },
        {
          content: "financial",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "재정의, 금융의",
        },
        {
          content: "apology",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "사과, 사죄",
        },
        {
          content: "financial",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "재정의, 금융의",
        },
        {
          content: "apology",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "사과, 사죄",
        },
        {
          content: "financial",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "재정의, 금융의",
        },
        {
          content: "apology",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "사과, 사죄",
        },
        {
          content: "financial",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "재정의, 금융의",
        },
        {
          content: "apology",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "사과, 사죄",
        },
        {
          content: "financial",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "재정의, 금융의",
        },
        {
          content: "apology",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "사과, 사죄",
        },
        {
          content: "financial",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "재정의, 금융의",
        },
        {
          content: "apology",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "사과, 사죄",
        },
        {
          content: "financial",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "재정의, 금융의",
        },
        {
          content: "apology",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "사과, 사죄",
        },
        {
          content: "financial",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "재정의, 금융의",
        },
        {
          content: "apology",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "사과, 사죄",
        },
        {
          content: "financial",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "재정의, 금융의",
        },
        {
          content: "apology",
          koreanMeaning: null,
          englishExample: null,
          choices: null,
          answer: "사과, 사죄",
        },
      ],
    },
  ],
};
const page = () => {
  return (
    <div className="w-[800px]">
      <ExamSingle
        initData={{
          testName: "test",
          blank: "NARROWLY",
          lineInterval: "NARROWLY",
          fontSize: "WIDELY",
          details: DownloadData.details,
        }}
      />
      {/* <WordExamSingle
        initData={{
          testName: "test",
          blank: "NARROWLY",
          lineInterval: "NARROWLY",
          fontSize: "WIDELY",
          details: DownloadData.details,
        }}
      /> */}
      {/* <HwpExamSingle initData={temp} /> */}
      {/* <ExamDouble
        initData={{
          testName: "test",
          blank: "NARROWLY",
          lineInterval: "NARROWLY",
          fontSize: "MINIMUM",
          details: [],
        }}
      /> */}
      {/* <WordExamSingle
        initData={{
          testName: "test",
          blank: "WIDELY",
          lineInterval: "NARROWLY",
          fontSize: "WIDELY",
          academyName: "test",
          className: "test",
          name: "test",
          questionLength: 10,
          testDate: "2025-01-01",
          testTime: "1000",

          details: temp.details,
        }}
      /> */}
    </div>
  );
};

export default page;
