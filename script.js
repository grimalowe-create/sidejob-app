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

function determineSideJob(time, cost, skill) {
  if (skill === "programming") {
    if (time === "long" || time === "medium") {
      return {
        title: "Web開発・プログラミング",
        description: "時間が取れて、プログラミングに自信があるなら、クラウドソーシングやフリーランス案件での開発がおすすめです。"
      };
    }
    return {
      title: "プログラミング学習と小さな案件",
      description: "短時間でも学習を続け、スモールスタートで簡単な案件を受ける方法が向いています。"
    };
  }

  if (skill === "writing") {
    if (cost === "none") {
      return {
        title: "ライティング・ブログ",
        description: "ほぼ初期費用なしで始められ、文章力を活かして記事作成やブログ運営ができます。"
      };
    }
    return {
      title: "コンテンツ制作",
      description: "文章力を活かして、Webライティングやメルマガ、SNS投稿などの副業に挑戦できます。"
    };
  }

  if (skill === "speaking") {
    if (time === "short") {
      return {
        title: "動画編集・音声制作",
        description: "話すことや動画が得意なら、短時間で編集やナレーション制作を行う副業がおすすめです。"
      };
    }
    return {
      title: "オンライン講座・配信",
      description: "動画配信やオンライン講座でスキルを伝え、収益化する方法が向いています。"
    };
  }

  // skill === none
  if (time === "short" && cost === "none") {
    return {
      title: "タスク系ウェブ副業",
      description: "アンケートやポイントサイトなど、特別なスキルがなくても始めやすい副業です。"
    };
  }

  if (time === "medium" || cost === "low") {
    return {
      title: "スモールビジネス・物販",
      description: "初期費用を抑えつつ、少し時間を使って販売や転売を試す方法がおすすめです。"
    };
  }

  return {
    title: "デジタルサービスの副業",
    description: "特別なスキルがなくても、学びながら副業を進められる案件を探してみましょう。"
  };
}

function validateAnswers(time, cost, skill) {
  return time && cost && skill;
}

function handleDiagnose() {
  const time = getSelectedValue("time");
  const cost = getSelectedValue("cost");
  const skill = getSelectedValue("skill");

  if (!validateAnswers(time, cost, skill)) {
    resultBox.style.display = "block";
    resultBox.innerHTML = `
      <h3>入力が不足しています</h3>
      <p>すべての質問に回答してください。</p>
    `;
    return;
  }

  const recommendation = determineSideJob(time, cost, skill);
  showResult(recommendation.title, recommendation.description);
}

diagnoseButton.addEventListener("click", handleDiagnose);
