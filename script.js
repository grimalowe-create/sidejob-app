const diagnoseButton = document.getElementById("diagnoseButton");
const resultBox = document.getElementById("result");

function getSelectedValue(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : null;
}

function showResult(title, description) {
  resultBox.style.display = "block";
  resultBox.innerHTML = `
    <h3>${title}</h3>
    <p>${description}</p>
  `;
}

function determineSideJob(time, cost, skill, skillLevel, purpose, duration) {
  // 優先度: skill > skillLevel > purpose > time/cost/duration

  // プログラミングスキルがある場合
  if (skill === "programming") {
    if (purpose === "high_income" && duration === "long") {
      return {
        title: "プログラミング副業",
        description: "クラウドソーシングやフリーランスで高単価の開発案件を受注。継続的にスキルアップしながら収入を得られます。"
      };
    }
    if (purpose === "skillup") {
      return {
        title: "プログラミング学習と小規模案件",
        description: "オンライン講座で学びながら、簡単なバグ修正や小規模開発で実践。スキルアップに最適です。"
      };
    }
    return {
      title: "Web開発・アプリ開発",
      description: "自分のペースで開発案件を探し、柔軟に副業を進められます。"
    };
  }

  // 文章スキルがある場合
  if (skill === "writing" || skillLevel === "writing") {
    if (purpose === "skillup" && duration === "long") {
      return {
        title: "ブログアフィリエイト",
        description: "自分のブログを作成し、アフィリエイトで収益化。文章力を活かしつつ、SEOやマーケティングを学べます。"
      };
    }
    if (purpose === "high_income") {
      return {
        title: "Webライター",
        description: "企業サイトやメディア向けに記事執筆。高単価の案件が多く、継続的に稼げます。"
      };
    }
    return {
      title: "コンテンツライター",
      description: "SNS投稿、メルマガ、記事作成など、柔軟なライティング副業がおすすめです。"
    };
  }

  // 話す・動画スキルがある場合
  if (skill === "speaking" || skillLevel === "speaking") {
    if (purpose === "high_income" && time === "long") {
      return {
        title: "YouTubeショート",
        description: "短い動画コンテンツを作成し、広告収入やスポンサーを狙う。クリエイティブに収益化できます。"
      };
    }
    if (purpose === "independence") {
      return {
        title: "オンライン講師",
        description: "自分の知識をオンライン講座で教え、収益化。将来的な独立に向けたステップになります。"
      };
    }
    return {
      title: "動画コンテンツ制作",
      description: "TikTokやInstagramで動画配信、またはナレーション・編集の副業が向いています。"
    };
  }

  // PC・ネット操作が得意の場合
  if (skillLevel === "pc") {
    if (purpose === "low_income" && time === "short") {
      return {
        title: "データ入力・事務代行",
        description: "PCスキルで簡単なデータ入力や事務作業。短時間で低収入から始められます。"
      };
    }
    if (purpose === "skillup") {
      return {
        title: "Webデザイン",
        description: "ツールを使ってデザインを学び、サイト作成やバナー制作の副業に挑戦。"
      };
    }
    return {
      title: "デジタルアシスタント",
      description: "SNS管理、メール対応など、PC操作を活かした副業です。"
    };
  }

  // スキルなしの場合
  if (skill === "none" && skillLevel === "none") {
    if (purpose === "low_income" && cost === "none") {
      return {
        title: "アンケート・ポイントサイト",
        description: "特別なスキル不要で、短時間で収入を得られる方法。初期費用ゼロです。"
      };
    }
    if (purpose === "skillup") {
      return {
        title: "ココナラでスキル販売",
        description: "自分の得意なことを学びながら、小さなサービスを提供。スキルアップしながら稼げます。"
      };
    }
    if (purpose === "independence") {
      return {
        title: "SNSコンサル",
        description: "SNS運用を学び、個人や小規模ビジネス向けにコンサルティング。将来的独立を目指せます。"
      };
    }
    return {
      title: "物販・転売",
      description: "メルカリやAmazonで商品販売。初期費用を抑えつつ、ビジネス感覚を養えます。"
    };
  }

  // デフォルト
  return {
    title: "総合副業",
    description: "あなたの回答に基づき、まずは簡単な副業から始め、徐々にスキルアップしていくのがおすすめです。"
  };
}

function validateAnswers(time, cost, skill, skillLevel, purpose, duration) {
  return time && cost && skill && skillLevel && purpose && duration;
}

function handleDiagnose() {
  const time = getSelectedValue("time");
  const cost = getSelectedValue("cost");
  const skill = getSelectedValue("skill");
  const skillLevel = getSelectedValue("skillLevel");
  const purpose = getSelectedValue("purpose");
  const duration = getSelectedValue("duration");

  if (!validateAnswers(time, cost, skill, skillLevel, purpose, duration)) {
    resultBox.style.display = "block";
    resultBox.innerHTML = `
      <h3>入力が不足しています</h3>
      <p>すべての質問に回答してください。</p>
    `;
    return;
  }

  const recommendation = determineSideJob(time, cost, skill, skillLevel, purpose, duration);
  showResult(recommendation.title, recommendation.description);
}

diagnoseButton.addEventListener("click", handleDiagnose);
