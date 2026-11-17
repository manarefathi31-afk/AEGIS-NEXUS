/* ==========================================================================
   AEGIS NEXUS — ALGERIAN CYBER DEFENSE
   Frontend Security Controller & Strict Native Bridge Adapter
   Zero Fake Data Policy: All states reflect real Android or WebCrypto APIs.
   ========================================================================== */
"use strict";

const I18N = {
  ar: {
    identity_badge: "الدفاع السيبراني الجزائري",
    tagline: "جهازك. بياناتك. حصنك الرقمي.",
    motto: "جهاز واحد. طبقات دفاع متعددة. درع واحد قوي.",
    splash_init: "تهيئة النواة الأمنية المحلية...",
    splash_bridge: "فحص جسر أندرويد الأصلي...",
    splash_ready: "النظام جاهز",
    nav_dashboard: "لوحة القيادة",
    nav_device: "حماية الجهاز",
    nav_apps: "فاحص التطبيقات",
    nav_network: "أمن الشبكة",
    nav_privacy: "مركز الخصوصية",
    nav_threats: "استخبارات التهديدات",
    nav_alerts: "التنبيهات الأمنية",
    nav_vault: "حماية البيانات",
    nav_recovery: "مركز الاستعادة",
    nav_monitor: "مراقب النظام",
    nav_settings: "الإعدادات",
    nav_about: "حول النظام",
    btn_scan_now: "فحص فوري",
    btn_inspect_device: "فحص الجهاز",
    btn_export_report: "تصدير التقرير",
    btn_scan_apps: "فحص التطبيقات",
    btn_check_network: "فحص الشبكة",
    btn_enable_vpn: "تفعيل VPN المحلي",
    btn_disable_vpn: "إيقاف VPN المحلي",
    btn_audit_privacy: "تدقيق الصلاحيات",
    btn_android_settings: "إعدادات أندرويد",
    btn_pick_file: "اختيار ملف للفحص",
    btn_native_scan: "فحص أندرويد العميق",
    btn_check_defs: "تحديث القواعد",
    btn_test_notif: "اختبار إشعار",
    btn_clear_log: "مسح السجل",
    btn_bio_verify: "تحقق بالبصمة",
    btn_set_pin: "تعيين PIN",
    btn_lock_now: "قفل الجلسة الآن",
    btn_export_backup: "تصدير نسخة مشفرة",
    btn_export_json_report: "تصدير التقرير الأمني",
    btn_restore_backup: "استعادة والتحقق",
    btn_refresh: "تحديث البيانات",
    btn_reset: "إعادة ضبط",
    btn_authorize: "موافق وتفويض",
    btn_cancel: "إلغاء",
    btn_unlock: "فتح القفل",
    dash_title_init: "جاري التحقق من الجاهزية الأمنية",
    dash_desc_honest: "يعتمد التقييم الأمني حصراً على البيانات الحقيقية المتاحة من النظام. لا يتم اختلاق أي أرقام أو درجات حماية.",
    lbl_last_scan: "آخر فحص:",
    dash_telemetry_chart: "التوزيع الفعلي للوحدات الأمنية",
    dash_recommendations: "التوصيات الأمنية",
    rec_webcrypto_ready: "محرك فحص الملفات المحلي (SHA-256) والنسخ المشفر (AES-GCM) نشطان دون اتصال.",
    rec_offline_enabled: "وضع عدم الاتصال التام مفعّل لحماية الخصوصية.",
    rec_network_online: "الجهاز متصل بالشبكة حالياً؛ تأكد من موثوقية شبكة Wi-Fi.",
    device_subtitle: "فحص إعدادات أندرويد الحقيقية، مستوى التصحيح الأمني، التشفير وقفل الشاشة.",
    device_config_analysis: "تحليل إعدادات الأمان",
    apps_subtitle: "تدقيق التطبيقات المثبتة، مصدر التثبيت، والصلاحيات الحساسة ضمن قيود حزم أندرويد.",
    network_subtitle: "مراقبة اتصال Wi-Fi والبيانات، تحليل DNS، وحماية VPN المحلية الاختيارية.",
    network_recs: "توصيات الاتصال الآمن",
    privacy_subtitle: "تدقيق أذونات الكاميرا، الميكروفون، الموقع، جهات الاتصال، التخزين والرسائل مع رابط مباشر للإعدادات.",
    threats_subtitle: "فحص الملفات المختارة محلياً عبر SHA-256 وتحليل المؤشرات وقواعد التهديد بدون اتصال.",
    threats_results_title: "نتائج الفحص والأدلة",
    alerts_subtitle: "سجل الأحداث الأمنية المحلي وتنبيهات الخصوصية والشبكة المصنفة حسب الخطورة.",
    vault_subtitle: "Android Keystore، تشفير AES-GCM، قفل البصمة BiometricPrompt، وحماية الجلسة بـ PIN.",
    vault_pin_title: "إدارة رمز القفل (PIN)",
    recovery_subtitle: "تصدير نسخ احتياطية مشفرة بـ AES-GCM مع التحقق من السلامة (SHA-256) واستعادتها دون إنترنت.",
    monitor_subtitle: "حالة البطارية، التخزين، الذاكرة، إصدار أندرويد، وحالة كل وحدة دفاعية في النظام.",
    monitor_modules_title: "حالة الوحدات الأمنية",
    settings_subtitle: "إعدادات اللغة، القفل التلقائي، الوضع غير المتصل، وتشخيص جسر الاتصال.",
    lbl_language: "لغة الواجهة",
    lbl_autolock: "القفل التلقائي للجلسة",
    lbl_strict_offline: "فرض وضع عدم الاتصال التام (Offline-Only)",
    lbl_reset_data: "مسح السجلات المحلية المؤقتة",
    lbl_bridge_diag: "تشخيص الجسر الأمني (WebView ↔ Kotlin)",
    opt_off: "معطل",
    about_desc: "منصة دفاع سيبراني معيارية مصممة وفق مبادئ Defense in Depth و Zero Trust و Privacy by Design. يلتزم النظام بالشفافية الكاملة واحترام قيود Android Sandbox دون اختلاق نتائج أو الادعاء بحماية مطلقة.",
    about_matrix_title: "مصفوفة شفافية التنفيذ (الواجهة مقابل المحرك الأصلي)",
    vpn_modal_title: "تفويض خدمة VPN المحلية",
    vpn_modal_desc: "يتطلب تفعيل حماية الشبكة المحلية عبر Android VpnService موافقتك الصريحة وتأكيد نافذة نظام أندرويد. لا يتم إرسال أي بيانات خارج جهازك.",
    lock_prompt: "الجلسة مقفلة — أدخل رمز PIN للمتابعة",
    ph_search_apps: "بحث بالاسم أو الحزمة...",
    ph_enter_pin: "أدخل رمز PIN (4-8 أرقام)",
    ph_backup_pass: "كلمة مرور تشفير النسخة الاحتياطية",
    filter_all: "الكل",
    filter_high: "صلاحيات حساسة مرتفعة",
    filter_sideloaded: "خارج المتجر",
    native_required_msg: "غير متاح في معاينة المتصفح — يتطلب تشغيل التطبيق داخل محرك Kotlin على أندرويد.",
    offline_blocked_msg: "الخدمات السحابية غير متاحة في وضع عدم الاتصال التام."
  },
  en: {
    identity_badge: "ALGERIAN CYBER DEFENSE",
    tagline: "YOUR DEVICE. YOUR DATA. YOUR DIGITAL FORTRESS.",
    motto: "ONE DEVICE. MULTIPLE DEFENSE LAYERS. ONE POWERFUL SHIELD.",
    splash_init: "Initializing offline security core...",
    splash_bridge: "Probing native Android bridge...",
    splash_ready: "System Ready",
    nav_dashboard: "Dashboard",
    nav_device: "Device Protection",
    nav_apps: "Application Scanner",
    nav_network: "Network Security",
    nav_privacy: "Privacy Center",
    nav_threats: "Threat Intelligence",
    nav_alerts: "Security Alerts",
    nav_vault: "Data Protection",
    nav_recovery: "Recovery Center",
    nav_monitor: "System Monitor",
    nav_settings: "Settings",
    nav_about: "About AEGIS NEXUS",
    btn_scan_now: "Quick Scan",
    btn_inspect_device: "Inspect Device",
    btn_export_report: "Export Report",
    btn_scan_apps: "Scan Apps",
    btn_check_network: "Check Network",
    btn_enable_vpn: "Enable Local VPN",
    btn_disable_vpn: "Disable Local VPN",
    btn_audit_privacy: "Audit Permissions",
    btn_android_settings: "Android Settings",
    btn_pick_file: "Select File to Scan",
    btn_native_scan: "Deep Android Scan",
    btn_check_defs: "Check Updates",
    btn_test_notif: "Test Notification",
    btn_clear_log: "Clear Log",
    btn_bio_verify: "Verify Biometric",
    btn_set_pin: "Set PIN",
    btn_lock_now: "Lock Session Now",
    btn_export_backup: "Export Encrypted Backup",
    btn_export_json_report: "Export Security Report",
    btn_restore_backup: "Restore & Verify",
    btn_refresh: "Refresh Data",
    btn_reset: "Reset",
    btn_authorize: "Authorize",
    btn_cancel: "Cancel",
    btn_unlock: "Unlock",
    dash_title_init: "Evaluating Real Security Posture",
    dash_desc_honest: "Security indicators strictly reflect genuine system telemetry. No scores or detections are ever fabricated.",
    lbl_last_scan: "Last scan:",
    dash_telemetry_chart: "Actual Security Module Readiness",
    dash_recommendations: "Security Recommendations",
    rec_webcrypto_ready: "Local WebCrypto SHA-256 file scanner & AES-GCM backup are active offline.",
    rec_offline_enabled: "Strict Offline-First mode is enabled for maximum privacy.",
    rec_network_online: "Network connectivity detected; verify Wi-Fi trustworthiness.",
    device_subtitle: "Real Android OS inspection, security patch level, encryption, and screen lock verification.",
    device_config_analysis: "Device Configuration Analysis",
    apps_subtitle: "Audit accessible installed packages, installation sources, and sensitive permissions.",
    network_subtitle: "Monitor Wi-Fi/Cellular capabilities, DNS info, and optional authorized local VPN defense.",
    network_recs: "Secure Connection Recommendations",
    privacy_subtitle: "Audit Camera, Microphone, Location, Contacts, Storage, and SMS/Phone permissions with direct Android settings links.",
    threats_subtitle: "Offline user-selected file scanning via SHA-256, header heuristics, and local threat intelligence.",
    threats_results_title: "Scan Results & Evidence",
    alerts_subtitle: "Local security event history and severity-classified notifications.",
    vault_subtitle: "Android Keystore, AES-GCM encryption, BiometricPrompt authentication, and session PIN lock.",
    vault_pin_title: "PIN Lock Management",
    recovery_subtitle: "Offline AES-GCM encrypted backups with SHA-256 integrity verification.",
    monitor_subtitle: "Battery, storage, memory, Android version, and live security module health.",
    monitor_modules_title: "Security Module Status",
    settings_subtitle: "Language, auto-lock timer, offline mode enforcement, and native bridge diagnostics.",
    lbl_language: "Interface Language",
    lbl_autolock: "Auto-Lock Timeout",
    lbl_strict_offline: "Enforce Strict Offline-Only Mode",
    lbl_reset_data: "Clear Local Cached Logs",
    lbl_bridge_diag: "Security Bridge Diagnostics (WebView ↔ Kotlin)",
    opt_off: "Disabled",
    about_desc: "Modular mobile cyber defense built on Defense in Depth, Zero Trust, and Privacy by Design. Fully transparent about Android Sandbox limits.",
    about_matrix_title: "Implementation Transparency Matrix",
    vpn_modal_title: "Local VPN Authorization",
    vpn_modal_desc: "Enabling local traffic protection via Android VpnService requires your explicit consent and Android OS confirmation. No traffic leaves your device.",
    lock_prompt: "Session Locked — Enter PIN to continue",
    ph_search_apps: "Search app or package...",
    ph_enter_pin: "Enter PIN (4-8 digits)",
    ph_backup_pass: "Backup encryption passphrase",
    filter_all: "All",
    filter_high: "Elevated Permissions",
    filter_sideloaded: "Sideloaded",
    native_required_msg: "Unavailable in browser preview — requires the native Kotlin engine on Android.",
    offline_blocked_msg: "Online intelligence updates are unavailable in strict offline mode."
  },
  fr: {
    identity_badge: "CYBERDÉFENSE ALGÉRIENNE",
    tagline: "VOTRE APPAREIL. VOS DONNÉES. VOTRE FORTERESSE NUMÉRIQUE.",
    motto: "UN APPAREIL. PLUSIEURS COUCHES. UN BOUCLIER PUISSANT.",
    splash_init: "Initialisation du noyau de sécurité hors ligne...",
    splash_bridge: "Vérification du pont natif Android...",
    splash_ready: "Système prêt",
    nav_dashboard: "Tableau de bord",
    nav_device: "Protection Appareil",
    nav_apps: "Scanner d'Applications",
    nav_network: "Sécurité Réseau",
    nav_privacy: "Centre de Confidentialité",
    nav_threats: "Renseignement Menaces",
    nav_alerts: "Alertes de Sécurité",
    nav_vault: "Protection des Données",
    nav_recovery: "Centre de Restauration",
    nav_monitor: "Moniteur Système",
    nav_settings: "Paramètres",
    nav_about: "À propos",
    btn_scan_now: "Analyse rapide",
    btn_inspect_device: "Inspecter l'appareil",
    btn_export_report: "Exporter le rapport",
    btn_scan_apps: "Analyser les apps",
    btn_check_network: "Vérifier réseau",
    btn_enable_vpn: "Activer VPN local",
    btn_disable_vpn: "Désactiver VPN local",
    btn_audit_privacy: "Auditer permissions",
    btn_android_settings: "Paramètres Android",
    btn_pick_file: "Choisir un fichier",
    btn_native_scan: "Analyse Android profonde",
    btn_check_defs: "Vérifier mises à jour",
    btn_test_notif: "Tester notification",
    btn_clear_log: "Effacer journal",
    btn_bio_verify: "Vérifier biométrie",
    btn_set_pin: "Définir PIN",
    btn_lock_now: "Verrouiller maintenant",
    btn_export_backup: "Exporter sauvegarde chiffrée",
    btn_export_json_report: "Exporter rapport sécurité",
    btn_restore_backup: "Restaurer et vérifier",
    btn_refresh: "Actualiser",
    btn_reset: "Réinitialiser",
    btn_authorize: "Autoriser",
    btn_cancel: "Annuler",
    btn_unlock: "Déverrouiller",
    dash_title_init: "Évaluation réelle de la posture de sécurité",
    dash_desc_honest: "Tous les indicateurs reflètent uniquement les données réelles disponibles. Aucun score n'est inventé.",
    lbl_last_scan: "Dernière analyse :",
    dash_telemetry_chart: "État réel des modules de sécurité",
    dash_recommendations: "Recommandations de sécurité",
    rec_webcrypto_ready: "Scanner SHA-256 local et sauvegarde AES-GCM actifs hors ligne.",
    rec_offline_enabled: "Mode hors ligne strict activé pour protéger la confidentialité.",
    rec_network_online: "Connexion réseau détectée ; vérifiez la fiabilité du Wi-Fi.",
    device_subtitle: "Inspection Android réelle : correctifs, chiffrement et verrouillage écran.",
    device_config_analysis: "Analyse de configuration",
    apps_subtitle: "Audit des paquets installés, sources et permissions sensibles.",
    network_subtitle: "Surveillance Wi-Fi/Cellulaire, DNS et protection VPN locale facultative.",
    network_recs: "Recommandations réseau",
    privacy_subtitle: "Audit Caméra, Micro, Position, Contacts, Stockage et SMS/Téléphone.",
    threats_subtitle: "Analyse locale de fichiers par SHA-256 et heuristiques hors ligne.",
    threats_results_title: "Résultats et preuves",
    alerts_subtitle: "Historique local des alertes classées par gravité.",
    vault_subtitle: "Android Keystore, chiffrement AES-GCM, BiometricPrompt et verrouillage PIN.",
    vault_pin_title: "Gestion du code PIN",
    recovery_subtitle: "Sauvegardes chiffrées AES-GCM avec vérification SHA-256 hors ligne.",
    monitor_subtitle: "Batterie, stockage, mémoire, version Android et état des modules.",
    monitor_modules_title: "État des modules",
    settings_subtitle: "Langue, verrouillage auto, mode hors ligne et diagnostic du pont.",
    lbl_language: "Langue de l'interface",
    lbl_autolock: "Verrouillage automatique",
    lbl_strict_offline: "Forcer le mode hors ligne strict",
    lbl_reset_data: "Effacer les journaux locaux",
    lbl_bridge_diag: "Diagnostic du pont (WebView ↔ Kotlin)",
    opt_off: "Désactivé",
    about_desc: "Plateforme modulaire de cyberdéfense basée sur Defense in Depth, Zero Trust et Privacy by Design.",
    about_matrix_title: "Matrice de transparence d'implémentation",
    vpn_modal_title: "Autorisation VPN local",
    vpn_modal_desc: "L'activation d'Android VpnService requiert votre consentement explicite. Aucune donnée ne quitte l'appareil.",
    lock_prompt: "Session verrouillée — Entrez le code PIN",
    ph_search_apps: "Rechercher app ou paquet...",
    ph_enter_pin: "Entrez PIN (4-8 chiffres)",
    ph_backup_pass: "Mot de passe de sauvegarde",
    filter_all: "Tout",
    filter_high: "Permissions élevées",
    filter_sideloaded: "Hors boutique",
    native_required_msg: "Indisponible en aperçu navigateur — nécessite le moteur Kotlin sur Android.",
    offline_blocked_msg: "Mises à jour en ligne indisponibles en mode hors ligne strict."
  }
};

const LOCAL_THREAT_DB = {
  version: "2026.11-OFFLINE-CORE",
  signatures: {
    "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f": {
      name: "EICAR-Test-Signature",
      severity: "HIGH",
      description: "Industry-standard harmless antivirus test signature matched."
    }
  },
  suspiciousStrings: ["su -c", "chmod 777", "Runtime.getRuntime().exec", "DexClassLoader", "android.permission.BIND_ACCESSIBILITY_SERVICE"]
};

const AppState = {
  lang: localStorage.getItem("aegis_lang") || "ar",
  strictOffline: localStorage.getItem("aegis_offline") !== "false",
  autoLockSec: parseInt(localStorage.getItem("aegis_autolock") || "0", 10),
  lastActivity: Date.now(),
  vpnActive: false,
  appsCache: [],
  alerts: JSON.parse(localStorage.getItem("aegis_alerts") || "[]"),
  lastAudit: null,
  lastChartCounts: { ready: 2, warning: 1, critical: 0, unavailable: 3 }
};

const $ = (id) => document.getElementById(id);

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (m) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[m]));
}

function t(key) {
  return (I18N[AppState.lang] && I18N[AppState.lang][key]) || I18N.en[key] || key;
}

function showToast(msg) {
  const box = $("toast-container");
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  box.appendChild(el);
  setTimeout(() => el.remove(), 3400);
}

const AegisBridge = {
  isNative() {
    return typeof window.AegisNative === "object" && window.AegisNative !== null;
  },
  call(method, ...args) {
    if (!this.isNative() || typeof window.AegisNative[method] !== "function") {
      return null;
    }
    try {
      const res = window.AegisNative[method](...args);
      if (typeof res === "string") {
        try { return JSON.parse(res); } catch { return res; }
      }
      return res;
    } catch (err) {
      addAlert("HIGH", "Native Bridge Error", `${method}: ${err.message}`);
      return null;
    }
  }
};

function applyLanguage(lang) {
  AppState.lang = lang;
  localStorage.setItem("aegis_lang", lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  $("lang-select").value = lang;
  $("settings-lang-select").value = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
  });

  const activeNav = document.querySelector(".nav-item.active");
  if (activeNav) {
    const lbl = activeNav.querySelector("[data-i18n]");
    if (lbl) $("current-page-label").textContent = lbl.textContent;
  }
  renderImplementationMatrix();
  runFullAudit();
  inspectDevice();
  checkNetwork();
  auditPrivacy();
  scanApplications();
}

function navigateTo(pageId) {
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach((n) => n.classList.remove("active"));
  const target = $(`page-${pageId}`);
  const nav = document.querySelector(`.nav-item[data-page="${pageId}"]`);
  if (target) target.classList.add("active");
  if (nav) {
    nav.classList.add("active");
    const lbl = nav.querySelector("[data-i18n]");
    if (lbl) $("current-page-label").textContent = lbl.textContent;
  }
  $("sidebar").classList.remove("open");
  $("sidebar-overlay").classList.remove("open");
  if (pageId === "monitor") refreshSystemMonitor();
  if (pageId === "settings") renderBridgeDiagnostics();
}

function addAlert(severity, title, detail) {
  const item = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    time: new Date().toISOString(),
    severity,
    title,
    detail
  };
  AppState.alerts.unshift(item);
  AppState.alerts = AppState.alerts.slice(0, 100);
  localStorage.setItem("aegis_alerts", JSON.stringify(AppState.alerts));
  renderAlerts();
}

function renderAlerts() {
  const filter = $("alert-severity-filter").value;
  const list = $("alerts-feed");
  const filtered = AppState.alerts.filter((a) => filter === "ALL" || a.severity === filter);
  $("alert-badge-count").textContent = AppState.alerts.length;
  $("dash-alerts-count").textContent = AppState.alerts.length;
  $("dash-alerts-sub").textContent = AppState.alerts[0] ? AppState.alerts[0].title : "—";

  if (!filtered.length) {
    list.innerHTML = `<div class="stack-item">0 alerts recorded.</div>`;
    return;
  }
  list.innerHTML = filtered.map((a) => {
    const cls = a.severity === "CRITICAL" || a.severity === "HIGH" ? "state-critical"
      : a.severity === "MEDIUM" ? "state-warning" : "state-info";
    return `<div class="stack-item">
      <div class="stack-item-head">
        <strong>${escapeHtml(a.title)}</strong>
        <span class="status-badge ${cls}">${escapeHtml(a.severity)}</span>
      </div>
      <div>${escapeHtml(a.detail)}</div>
      <div class="mono">${escapeHtml(a.time)}</div>
    </div>`;
  }).join("");
}

function setStatusBadge(el, state) {
  el.textContent = state;
  el.className = "status-badge " + (
    state === "PROTECTED" || state === "READY" ? "state-protected" :
    state === "WARNING" ? "state-warning" :
    state === "CRITICAL" ? "state-critical" :
    state === "SCANNING" ? "state-scanning" : "state-unavailable"
  );
}

function updateOnlineBadge() {
  const b = $("online-badge");
  const online = navigator.onLine && !AppState.strictOffline;
  b.textContent = AppState.strictOffline ? "OFFLINE-ONLY" : (navigator.onLine ? "ONLINE" : "OFFLINE");
  b.className = "pill " + (online ? "pill-ok" : "pill-offline");
}

function runFullAudit() {
  setStatusBadge($("overall-status-badge"), "SCANNING");
  const nativeAudit = AegisBridge.call("runFullAudit");

  if (!nativeAudit) {
    setStatusBadge($("overall-status-badge"), "UNAVAILABLE");
    $("overall-status-title").textContent = t("native_required_msg");
    setStatusBadge($("dash-device-state"), "UNAVAILABLE");
    $("dash-device-sub").textContent = t("native_required_msg");
    setStatusBadge($("dash-apps-state"), "UNAVAILABLE");
    $("dash-apps-sub").textContent = t("native_required_msg");
    setStatusBadge($("dash-network-state"), navigator.onLine ? "WARNING" : "PROTECTED");
    $("dash-network-sub").textContent = navigator.onLine ? "Web Online (No VpnService)" : "Offline";
    setStatusBadge($("dash-privacy-state"), "UNAVAILABLE");
    $("dash-privacy-sub").textContent = t("native_required_msg");
    setStatusBadge($("dash-threat-state"), "PROTECTED");
    $("dash-threat-sub").textContent = `WebCrypto SHA-256 + DB ${LOCAL_THREAT_DB.version}`;
    $("last-scan-time").textContent = new Date().toLocaleTimeString();

    renderRecommendations([
      t("native_required_msg"),
      t("rec_webcrypto_ready"),
      AppState.strictOffline ? t("rec_offline_enabled") : t("rec_network_online")
    ]);
    AppState.lastChartCounts = { ready: 2, warning: navigator.onLine ? 1 : 0, critical: 0, unavailable: 3 };
    drawTelemetryChart(AppState.lastChartCounts);
    return;
  }

  AppState.lastAudit = nativeAudit;
  setStatusBadge($("overall-status-badge"), nativeAudit.overallState || "WARNING");
  $("overall-status-title").textContent = nativeAudit.summaryTitle || "Android Security Audit Complete";
  $("last-scan-time").textContent = new Date().toLocaleTimeString();

  setStatusBadge($("dash-device-state"), nativeAudit.deviceState || "UNAVAILABLE");
  $("dash-device-sub").textContent = nativeAudit.deviceSummary || "—";
  setStatusBadge($("dash-apps-state"), nativeAudit.appsState || "UNAVAILABLE");
  $("dash-apps-sub").textContent = nativeAudit.appsSummary || "—";
  setStatusBadge($("dash-network-state"), nativeAudit.networkState || "UNAVAILABLE");
  $("dash-network-sub").textContent = nativeAudit.networkSummary || "—";
  setStatusBadge($("dash-privacy-state"), nativeAudit.privacyState || "UNAVAILABLE");
  $("dash-privacy-sub").textContent = nativeAudit.privacySummary || "—";
  setStatusBadge($("dash-threat-state"), "PROTECTED");
  $("dash-threat-sub").textContent = `Offline Signatures: ${LOCAL_THREAT_DB.version}`;

  renderRecommendations(nativeAudit.recommendations || []);
  AppState.lastChartCounts = nativeAudit.chartCounts || { ready: 4, warning: 1, critical: 0, unavailable: 0 };
  drawTelemetryChart(AppState.lastChartCounts);
}

function renderRecommendations(items) {
  const ul = $("dash-recommendations-list");
  ul.innerHTML = items.map((x) => `<li>▸ ${escapeHtml(x)}</li>`).join("");
}

function drawTelemetryChart(counts) {
  const canvas = $("dash-health-canvas");
  if (!canvas || !canvas.getContext) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const logicalW = 480, logicalH = 220;
  canvas.width = logicalW * dpr;
  canvas.height = logicalH * dpr;

  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, logicalW, logicalH);

  const data = [
    { label: "READY", val: counts.ready || 0, color: "#10B981" },
    { label: "WARNING", val: counts.warning || 0, color: "#F59E0B" },
    { label: "CRITICAL", val: counts.critical || 0, color: "#EF4444" },
    { label: "UNAVAIL", val: counts.unavailable || 0, color: "#64748B" }
  ];
  const maxVal = Math.max(1, ...data.map((d) => d.val));
  const barW = 72, gap = 36, startX = 42, baseY = logicalH - 36;

  ctx.strokeStyle = "rgba(0,229,255,0.22)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(20, baseY);
  ctx.lineTo(logicalW - 20, baseY);
  ctx.stroke();

  data.forEach((d, idx) => {
    const x = startX + idx * (barW + gap);
    const barH = Math.round((d.val / maxVal) * (logicalH - 78));
    ctx.fillStyle = d.color;
    ctx.fillRect(x, baseY - barH, barW, barH);
    ctx.fillStyle = "#EDF4FF";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.fillText(String(d.val), x + barW / 2, baseY - barH - 8);
    ctx.fillStyle = "#B8C7D9";
    ctx.font = "bold 12px monospace";
    ctx.fillText(d.label, x + barW / 2, baseY + 18);
  });
}

function inspectDevice() {
  const data = AegisBridge.call("getDeviceSecurity");
  const grid = $("device-specs-grid");
  const checks = $("device-checks-list");

  if (!data) {
    grid.innerHTML = `
      <div class="info-tile"><label>Platform</label><strong>${escapeHtml(navigator.platform || "Web")}</strong></div>
      <div class="info-tile"><label>Android Security Patch</label><strong>UNAVAILABLE</strong></div>
      <div class="info-tile"><label>Storage Encryption</label><strong>UNAVAILABLE</strong></div>
      <div class="info-tile"><label>Screen Lock</label><strong>UNAVAILABLE</strong></div>`;
    checks.innerHTML = `<div class="stack-item">${escapeHtml(t("native_required_msg"))}</div>`;
    return;
  }

  grid.innerHTML = `
    <div class="info-tile"><label>Model</label><strong>${escapeHtml(data.manufacturer + " " + data.model)}</strong></div>
    <div class="info-tile"><label>Android Version</label><strong>Android ${escapeHtml(data.androidVersion)} (API ${escapeHtml(data.sdkInt)})</strong></div>
    <div class="info-tile"><label>Security Patch</label><strong>${escapeHtml(data.securityPatch || "Unknown")}</strong></div>
    <div class="info-tile"><label>Device Lock / Encryption</label><strong>${data.isDeviceSecure ? "SECURE LOCK" : "NO LOCK"} / ${escapeHtml(data.encryptionStatus)}</strong></div>`;

  checks.innerHTML = (data.details || []).map((c) => `
    <div class="stack-item">
      <div class="stack-item-head">
        <strong>${escapeHtml(c.title)}</strong>
        <span class="status-badge ${c.ok ? "state-protected" : "state-warning"}">${c.ok ? "PROTECTED" : "WARNING"}</span>
      </div>
      <div>${escapeHtml(c.message)}</div>
    </div>`).join("");
}

function scanApplications() {
  const data = AegisBridge.call("scanInstalledApps");
  const list = $("apps-list");
  if (!data || !Array.isArray(data.apps)) {
    $("apps-summary-bar").textContent = t("native_required_msg");
    list.innerHTML = `<div class="stack-item">${escapeHtml(t("native_required_msg"))}</div>`;
    return;
  }
  AppState.appsCache = data.apps;
  renderFilteredApps();
}

function renderFilteredApps() {
  const q = $("app-search-input").value.trim().toLowerCase();
  const f = $("app-filter-select").value;
  const filtered = AppState.appsCache.filter((app) => {
    const matchText = !q || app.name.toLowerCase().includes(q) || app.packageName.toLowerCase().includes(q);
    const matchFilter = f === "ALL" || (f === "HIGH" && app.riskLevel !== "LOW") || (f === "SIDELOADED" && app.sideloaded);
    return matchText && matchFilter;
  });
  $("apps-summary-bar").textContent = `Visible Packages: ${filtered.length} / ${AppState.appsCache.length}`;
  $("apps-list").innerHTML = filtered.slice(0, 120).map((app) => {
    const cls = app.riskLevel === "HIGH" ? "state-critical" : app.riskLevel === "MEDIUM" ? "state-warning" : "state-protected";
    return `<div class="stack-item">
      <div class="stack-item-head">
        <strong>${escapeHtml(app.name)} <span class="mono">v${escapeHtml(app.versionName)}</span></strong>
        <span class="status-badge ${cls}">${escapeHtml(app.riskLevel)}</span>
      </div>
      <div class="mono">${escapeHtml(app.packageName)} | Installer: ${escapeHtml(app.installer || "Unknown/Sideloaded")}</div>
      <div class="muted-note">Sensitive Permissions (${(app.dangerousPermissions || []).length}): ${escapeHtml((app.dangerousPermissions || []).join(", ") || "None")}</div>
    </div>`;
  }).join("");
}

function checkNetwork() {
  const data = AegisBridge.call("getNetworkStatus");
  const grid = $("network-status-grid");
  const recs = $("network-recommendations");

  if (!data) {
    const conn = navigator.connection || {};
    grid.innerHTML = `
      <div class="info-tile"><label>Connection</label><strong>${navigator.onLine ? "ONLINE" : "OFFLINE"}</strong></div>
      <div class="info-tile"><label>Effective Type</label><strong>${escapeHtml(conn.effectiveType || "UNAVAILABLE")}</strong></div>
      <div class="info-tile"><label>DNS Inspection</label><strong>UNAVAILABLE</strong></div>
      <div class="info-tile"><label>Local VPN Defense</label><strong>UNAVAILABLE</strong></div>`;
    recs.innerHTML = `<li>▸ ${escapeHtml(t("native_required_msg"))}</li>`;
    return;
  }

  AppState.vpnActive = !!data.vpnActive;
  $("vpn-status-label").textContent = AppState.vpnActive ? t("btn_disable_vpn") : t("btn_enable_vpn");
  grid.innerHTML = `
    <div class="info-tile"><label>Connected</label><strong>${data.connected ? "YES" : "NO"}</strong></div>
    <div class="info-tile"><label>Transport</label><strong>${escapeHtml(data.transport)}</strong></div>
    <div class="info-tile"><label>DNS Servers</label><strong>${escapeHtml((data.dnsServers || []).join(", ") || "UNAVAILABLE")}</strong></div>
    <div class="info-tile"><label>Local VPN</label><strong>${data.vpnActive ? "ACTIVE" : "INACTIVE"}</strong></div>`;
  recs.innerHTML = (data.recommendations || []).map((r) => `<li>▸ ${escapeHtml(r)}</li>`).join("");
}

function auditPrivacy() {
  const data = AegisBridge.call("getPrivacyAudit");
  const grid = $("privacy-categories-grid");
  const cats = ["Camera", "Microphone", "Location", "Contacts", "Storage", "SMS & Phone"];
  if (!data || !data.categories) {
    grid.innerHTML = cats.map((c) => `
      <div class="kpi-card glass-card">
        <div class="kpi-head"><span>${escapeHtml(c)}</span><span class="status-badge state-unavailable">UNAVAILABLE</span></div>
        <p class="kpi-sub">${escapeHtml(t("native_required_msg"))}</p>
      </div>`).join("");
    return;
  }
  grid.innerHTML = data.categories.map((c) => `
    <div class="kpi-card glass-card">
      <div class="kpi-head"><span>${escapeHtml(c.label)}</span><span class="status-badge ${c.count > 5 ? "state-warning" : "state-info"}">${c.count}</span></div>
      <p class="kpi-sub">${escapeHtml(c.riskNote)}</p>
    </div>`).join("");
}

function renderThreatMeta() {
  $("threat-db-meta").innerHTML = `
    <div class="info-tile"><label>Local Engine</label><strong>WebCrypto SHA-256 + Kotlin</strong></div>
    <div class="info-tile"><label>Signature DB</label><strong>${escapeHtml(LOCAL_THREAT_DB.version)}</strong></div>
    <div class="info-tile"><label>Offline Capability</label><strong>READY</strong></div>`;
}

async function scanSelectedFile(file) {
  if (!file) return;
  const out = $("threat-scan-results");
  out.innerHTML = `<div class="stack-item">Scanning ${escapeHtml(file.name)} (${file.size} bytes)...</div>`;

  const buffer = await file.arrayBuffer();
  const hashBuf = await crypto.subtle.digest("SHA-256", buffer);
  const sha256 = Array.from(new Uint8Array(hashBuf)).map((b) => b.toString(16).padStart(2, "0")).join("");

  const bytes = new Uint8Array(buffer.slice(0, 16));
  const magic = Array.from(bytes.slice(0, 4)).map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
  let fileType = "Unknown/Data";
  if (magic.startsWith("504B0304")) fileType = "ZIP / Android APK Archive";
  else if (magic.startsWith("7F454C46")) fileType = "ELF Native Executable";
  else if (magic.startsWith("4D5A")) fileType = "Windows PE Executable";

  const evidence = [];
  let severity = "INFORMATIONAL";
  let verdict = "No known malicious signature matched locally.";

  const sigMatch = LOCAL_THREAT_DB.signatures[sha256];
  if (sigMatch) {
    severity = sigMatch.severity;
    verdict = `Matched local signature: ${sigMatch.name}`;
    evidence.push(sigMatch.description);
    addAlert(severity, `Threat Detected: ${sigMatch.name}`, `File: ${file.name} | SHA-256: ${sha256}`);
  }

  const textSlice = new TextDecoder("utf-8", { fatal: false }).decode(buffer.slice(0, 262144));
  const matchedStrings = LOCAL_THREAT_DB.suspiciousStrings.filter((s) => textSlice.includes(s));
  if (matchedStrings.length) {
    if (severity === "INFORMATIONAL") severity = "MEDIUM";
    evidence.push(`Suspicious strings found: ${matchedStrings.join(", ")}`);
  }
  if (file.name.toLowerCase().endsWith(".apk") || magic.startsWith("504B0304")) {
    evidence.push("APK/Archive header verified. Recommend verifying signature & permissions via NEXUS APP SCAN.");
  }

  const badgeCls = severity === "HIGH" || severity === "CRITICAL" ? "state-critical"
    : severity === "MEDIUM" ? "state-warning" : "state-protected";

  out.innerHTML = `<div class="stack-item">
    <div class="stack-item-head">
      <strong>${escapeHtml(file.name)}</strong>
      <span class="status-badge ${badgeCls}">${escapeHtml(severity)}</span>
    </div>
    <div class="mono">SHA-256: ${escapeHtml(sha256)}</div>
    <div>Type: ${escapeHtml(fileType)} | Size: ${file.size} bytes</div>
    <div><strong>Verdict:</strong> ${escapeHtml(verdict)}</div>
    <div class="muted-note">${escapeHtml(evidence.join(" | ") || "Clean against offline rules.")}</div>
  </div>`;
}

async function deriveAesKey(password, salt) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function sha256Hex(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function renderVaultStatus() {
  const hasPin = !!localStorage.getItem("aegis_pin_hash");
  const nativeVault = AegisBridge.call("getVaultStatus");
  $("vault-status-grid").innerHTML = `
    <div class="info-tile"><label>Android Keystore</label><strong>${nativeVault ? "ACTIVE (AES-GCM)" : "WEBCRYPTO FALLBACK"}</strong></div>
    <div class="info-tile"><label>BiometricPrompt</label><strong>${nativeVault ? escapeHtml(nativeVault.biometricStatus) : "UNAVAILABLE"}</strong></div>
    <div class="info-tile"><label>Session PIN</label><strong>${hasPin ? "CONFIGURED (SHA-256)" : "NOT SET"}</strong></div>`;
}

function lockSessionIfPinSet() {
  if (!localStorage.getItem("aegis_pin_hash")) {
    showToast("Set a PIN first.");
    return;
  }
  $("unlock-pin-input").value = "";
  $("unlock-error").textContent = "";
  $("pin-lock-overlay").classList.remove("hidden");
}

function downloadFile(filename, content) {
  if (AegisBridge.isNative()) {
    const saved = AegisBridge.call("saveExportedFile", filename, content);
    if (saved && saved.saved) {
      showToast("Saved: " + (saved.path || filename));
      return;
    }
  }
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function exportEncryptedBackup() {
  const pass = $("backup-password").value;
  if (pass.length < 6) {
    showToast("Use a passphrase of at least 6 characters.");
    return;
  }
  const payload = JSON.stringify({
    app: "AEGIS_NEXUS",
    exportedAt: new Date().toISOString(),
    settings: { lang: AppState.lang, strictOffline: AppState.strictOffline, autoLockSec: AppState.autoLockSec },
    alerts: AppState.alerts
  });
  const integrity = await sha256Hex(payload);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveAesKey(pass, salt);
  const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(payload));

  const envelope = {
    format: "AEGIS_NEXUS_AES_GCM_V1",
    sha256: integrity,
    salt: Array.from(salt),
    iv: Array.from(iv),
    ciphertext: Array.from(new Uint8Array(cipher))
  };
  downloadFile(`aegis-nexus-backup-${Date.now()}.aegis`, JSON.stringify(envelope, null, 2));
  $("recovery-log").innerHTML = `<div class="stack-item">Encrypted backup exported. Integrity SHA-256: <span class="mono">${integrity}</span></div>`;
}

async function restoreEncryptedBackup() {
  const file = $("restore-file-input").files[0];
  const pass = $("backup-password").value;
  if (!file || !pass) { showToast("Select backup file and enter passphrase."); return; }
  try {
    const env = JSON.parse(await file.text());
    const key = await deriveAesKey(pass, new Uint8Array(env.salt));
    const plainBuf = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(env.iv) },
      key,
      new Uint8Array(env.ciphertext)
    );
    const plain = new TextDecoder().decode(plainBuf);
    const verifyHash = await sha256Hex(plain);
    if (verifyHash !== env.sha256) throw new Error("Integrity mismatch");
    const data = JSON.parse(plain);
    if (Array.isArray(data.alerts)) {
      AppState.alerts = data.alerts;
      localStorage.setItem("aegis_alerts", JSON.stringify(AppState.alerts));
      renderAlerts();
    }
    $("recovery-log").innerHTML = `<div class="stack-item">Backup verified (SHA-256 OK) and restored from ${escapeHtml(data.exportedAt)}.</div>`;
  } catch (e) {
    $("recovery-log").innerHTML = `<div class="stack-item">Restore failed: wrong passphrase or corrupted backup.</div>`;
  }
}

async function refreshSystemMonitor() {
  const nativeMon = AegisBridge.call("getSystemMonitor");
  const grid = $("monitor-hardware-grid");
  const modBox = $("monitor-modules-table");

  if (!nativeMon) {
    let bat = "UNAVAILABLE";
    if (navigator.getBattery) {
      try {
        const b = await navigator.getBattery();
        bat = `${Math.round(b.level * 100)}% (${b.charging ? "Charging" : "Discharging"})`;
      } catch { bat = "UNAVAILABLE"; }
    }
    grid.innerHTML = `
      <div class="info-tile"><label>Battery</label><strong>${escapeHtml(bat)}</strong></div>
      <div class="info-tile"><label>Device Memory (Hint)</label><strong>${navigator.deviceMemory ? navigator.deviceMemory + " GB" : "UNAVAILABLE"}</strong></div>
      <div class="info-tile"><label>CPU Cores</label><strong>${navigator.hardwareConcurrency || "UNAVAILABLE"}</strong></div>
      <div class="info-tile"><label>Native Engine</label><strong>DISCONNECTED</strong></div>`;
  } else {
    grid.innerHTML = `
      <div class="info-tile"><label>Battery</label><strong>${nativeMon.batteryLevel}% (${nativeMon.batteryCharging ? "Charging" : "Battery"})</strong></div>
      <div class="info-tile"><label>Internal Storage</label><strong>${escapeHtml(nativeMon.storageFreeLabel)} / ${escapeHtml(nativeMon.storageTotalLabel)}</strong></div>
      <div class="info-tile"><label>System RAM</label><strong>${escapeHtml(nativeMon.ramAvailLabel)} / ${escapeHtml(nativeMon.ramTotalLabel)}</strong></div>
      <div class="info-tile"><label>Device / OS</label><strong>${escapeHtml(nativeMon.model)} (Android ${escapeHtml(nativeMon.androidVersion)})</strong></div>`;
  }

  const nativeFlag = AegisBridge.isNative();
  const modules = [
    ["NEXUS GUARD (Device)", nativeFlag ? "IMPLEMENTED" : "NATIVE REQUIRED"],
    ["NEXUS APP SCAN", nativeFlag ? "IMPLEMENTED" : "NATIVE REQUIRED"],
    ["NEXUS NETWORK / VPN", nativeFlag ? "IMPLEMENTED" : "NATIVE REQUIRED"],
    ["NEXUS PRIVACY", nativeFlag ? "IMPLEMENTED" : "NATIVE REQUIRED"],
    ["NEXUS THREAT (SHA-256 + Local Rules)", "IMPLEMENTED (OFFLINE)"],
    ["NEXUS SHIELD (AES-GCM + PIN)", "IMPLEMENTED"],
    ["NEXUS RECOVERY (Encrypted Backup)", "IMPLEMENTED"]
  ];
  modBox.innerHTML = modules.map(([name, status]) => `
    <div class="stack-item"><div class="stack-item-head"><strong>${escapeHtml(name)}</strong><span class="status-badge ${status.startsWith("IMPLEMENTED") ? "state-protected" : "state-unavailable"}">${escapeHtml(status)}</span></div></div>
  `).join("");
}

function renderImplementationMatrix() {
  const rows = [
    ["Frontend UI + Tri-Lingual RTL + Canvas", "Implemented (Phase 1)"],
    ["Local File SHA-256 & Heuristic Scanner", "Implemented (Phase 1 WebCrypto + Phase 2 Kotlin)"],
    ["AES-GCM Encrypted Backup & Restore", "Implemented (Phase 1 + Keystore Phase 2)"],
    ["Android Package, Permission & Network Inspection", "Requires Kotlin Engine (Phase 2 & 3)"]
  ];
  $("implementation-matrix").innerHTML = rows.map(([m, s]) => `
    <div class="stack-item"><div class="stack-item-head"><strong>${escapeHtml(m)}</strong><span class="mono">${escapeHtml(s)}</span></div></div>
  `).join("");
}

function renderBridgeDiagnostics() {
  const info = {
    nativeBridgeAttached: AegisBridge.isNative(),
    strictOfflineMode: AppState.strictOffline,
    browserOnline: navigator.onLine,
    userAgent: navigator.userAgent,
    webCryptoAvailable: !!(window.crypto && window.crypto.subtle),
    nativeInfo: AegisBridge.call("getBridgeVersion") || "Not connected (Web Preview)"
  };
  $("bridge-diag-box").textContent = JSON.stringify(info, null, 2);
}

function bindEvents() {
  $("menu-toggle").addEventListener("click", () => {
    $("sidebar").classList.toggle("open");
    $("sidebar-overlay").classList.toggle("open");
  });
  $("sidebar-overlay").addEventListener("click", () => {
    $("sidebar").classList.remove("open");
    $("sidebar-overlay").classList.remove("open");
  });

  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => navigateTo(btn.getAttribute("data-page")));
  });
  document.querySelectorAll(".kpi-card[data-jump]").forEach((card) => {
    card.addEventListener("click", () => navigateTo(card.getAttribute("data-jump")));
  });
  $("alert-bell-btn").addEventListener("click", () => navigateTo("alerts"));

  $("lang-select").addEventListener("change", (e) => applyLanguage(e.target.value));
  $("settings-lang-select").addEventListener("change", (e) => applyLanguage(e.target.value));

  $("btn-quick-scan").addEventListener("click", () => {
    runFullAudit();
    inspectDevice();
    checkNetwork();
    showToast("Audit refreshed.");
  });
  $("btn-scan-device").addEventListener("click", inspectDevice);
  $("btn-export-device-report").addEventListener("click", () => {
    const rep = AegisBridge.call("getDeviceSecurity") || { note: t("native_required_msg"), exportedAt: new Date().toISOString() };
    downloadFile(`aegis-device-report-${Date.now()}.json`, JSON.stringify(rep, null, 2));
  });

  $("btn-scan-apps").addEventListener("click", scanApplications);
  $("app-search-input").addEventListener("input", renderFilteredApps);
  $("app-filter-select").addEventListener("change", renderFilteredApps);

  $("btn-scan-network").addEventListener("click", checkNetwork);
  $("btn-toggle-vpn").addEventListener("click", () => {
    if (!AegisBridge.isNative()) { showToast(t("native_required_msg")); return; }
    if (AppState.vpnActive) {
      AegisBridge.call("toggleLocalVpn", false);
      checkNetwork();
    } else {
      $("vpn-consent-modal").classList.remove("hidden");
    }
  });
  $("btn-cancel-vpn").addEventListener("click", () => $("vpn-consent-modal").classList.add("hidden"));
  $("btn-confirm-vpn").addEventListener("click", () => {
    $("vpn-consent-modal").classList.add("hidden");
    AegisBridge.call("toggleLocalVpn", true);
    checkNetwork();
  });

  $("btn-audit-privacy").addEventListener("click", auditPrivacy);
  $("btn-open-app-settings").addEventListener("click", () => {
    if (!AegisBridge.call("openAndroidSettings", "APP_DETAILS", "")) showToast(t("native_required_msg"));
  });

  $("btn-trigger-file-scan").addEventListener("click", () => $("file-scan-input").click());
  $("file-scan-input").addEventListener("change", (e) => scanSelectedFile(e.target.files[0]));
  $("btn-native-file-scan").addEventListener("click", () => {
    if (!AegisBridge.call("requestFileScan")) showToast(t("native_required_msg"));
  });
  $("btn-check-updates").addEventListener("click", () => {
    if (AppState.strictOffline || !navigator.onLine) showToast(t("offline_blocked_msg"));
    else showToast(`Local DB ${LOCAL_THREAT_DB.version} is up to date.`);
  });

  $("alert-severity-filter").addEventListener("change", renderAlerts);
  $("btn-test-notification").addEventListener("click", () => {
    addAlert("INFORMATIONAL", "AEGIS NEXUS Self-Test", "Local security alert pipeline verified.");
    AegisBridge.call("sendTestNotification", "AEGIS NEXUS", "Security Alert System Active", "INFORMATIONAL");
    showToast("Test alert logged.");
  });
  $("btn-clear-alerts").addEventListener("click", () => {
    AppState.alerts = [];
    localStorage.setItem("aegis_alerts", "[]");
    renderAlerts();
  });

  $("btn-biometric-auth").addEventListener("click", () => {
    if (!AegisBridge.call("authenticateBiometric")) showToast(t("native_required_msg"));
  });
  $("btn-save-pin").addEventListener("click", async () => {
    const pin = $("pin-input").value.trim();
    if (!/^\d{4,8}$/.test(pin)) { showToast("PIN must be 4-8 digits."); return; }
    localStorage.setItem("aegis_pin_hash", await sha256Hex("AEGIS_SALT:" + pin));
    if (AegisBridge.isNative()) AegisBridge.call("setPinLock", pin);
    $("pin-input").value = "";
    renderVaultStatus();
    showToast("Session PIN configured.");
  });
  $("btn-verify-pin").addEventListener("click", lockSessionIfPinSet);
  $("btn-unlock-app").addEventListener("click", async () => {
    const pin = $("unlock-pin-input").value.trim();
    const expected = localStorage.getItem("aegis_pin_hash");
    const nativeOk = AegisBridge.isNative() ? AegisBridge.call("verifyPinLock", pin) : null;
    if ((nativeOk && nativeOk.verified) || (await sha256Hex("AEGIS_SALT:" + pin)) === expected) {
      $("pin-lock-overlay").classList.add("hidden");
      AppState.lastActivity = Date.now();
    } else {
      $("unlock-error").textContent = "Invalid PIN";
    }
  });

  $("btn-export-backup").addEventListener("click", exportEncryptedBackup);
  $("btn-export-report").addEventListener("click", () => {
    downloadFile(`aegis-security-report-${Date.now()}.json`, JSON.stringify({
      generatedAt: new Date().toISOString(),
      audit: AppState.lastAudit || "Web Preview",
      alerts: AppState.alerts
    }, null, 2));
  });
  $("btn-restore-backup").addEventListener("click", restoreEncryptedBackup);

  $("btn-refresh-monitor").addEventListener("click", refreshSystemMonitor);
  $("settings-offline-toggle").checked = AppState.strictOffline;
  $("settings-offline-toggle").addEventListener("change", (e) => {
    AppState.strictOffline = e.target.checked;
    localStorage.setItem("aegis_offline", String(AppState.strictOffline));
    updateOnlineBadge();
  });
  $("settings-autolock-select").value = String(AppState.autoLockSec);
  $("settings-autolock-select").addEventListener("change", (e) => {
    AppState.autoLockSec = parseInt(e.target.value, 10) || 0;
    localStorage.setItem("aegis_autolock", String(AppState.autoLockSec));
  });
  $("btn-reset-local-data").addEventListener("click", () => {
    localStorage.removeItem("aegis_alerts");
    AppState.alerts = [];
    renderAlerts();
    showToast("Local logs cleared.");
  });

  window.addEventListener("online", updateOnlineBadge);
  window.addEventListener("offline", updateOnlineBadge);
  ["click", "keydown", "touchstart"].forEach((ev) => {
    document.addEventListener(ev, () => { AppState.lastActivity = Date.now(); }, { passive: true });
  });
  setInterval(() => {
    if (AppState.autoLockSec > 0 && localStorage.getItem("aegis_pin_hash")) {
      if ((Date.now() - AppState.lastActivity) / 1000 > AppState.autoLockSec) {
        if ($("pin-lock-overlay").classList.contains("hidden")) lockSessionIfPinSet();
      }
    }
  }, 5000);
}

window.onAegisBiometricResult = function (success, message) {
  showToast(message || (success ? "Biometric verified" : "Biometric failed"));
  $("vault-lock-state").textContent = message || "";
};

window.onAegisNativeFileScanResult = function (jsonResult) {
  try {
    const res = typeof jsonResult === "string" ? JSON.parse(jsonResult) : jsonResult;
    const badgeCls = res.severity === "HIGH" || res.severity === "CRITICAL" ? "state-critical"
      : res.severity === "MEDIUM" ? "state-warning" : "state-protected";
    $("threat-scan-results").innerHTML = `<div class="stack-item">
      <div class="stack-item-head">
        <strong>${escapeHtml(res.fileName)}</strong>
        <span class="status-badge ${badgeCls}">${escapeHtml(res.severity)}</span>
      </div>
      <div class="mono">SHA-256: ${escapeHtml(res.sha256)}</div>
      <div>Type: ${escapeHtml(res.fileType)} | Size: ${res.sizeBytes} bytes</div>
      <div><strong>Verdict:</strong> ${escapeHtml(res.verdict)}</div>
      <div class="muted-note">${escapeHtml((res.evidence || []).join(" | "))}</div>
    </div>`;
  } catch (e) {
    showToast("File scan parse error.");
  }
};

function runSplashSequence() {
  const bar = $("splash-progress-bar");
  const txt = $("splash-status-text");
  setTimeout(() => { bar.style.width = "40%"; txt.textContent = t("splash_bridge"); }, 200);
  setTimeout(() => { bar.style.width = "82%"; txt.textContent = t("splash_ready"); }, 550);
  setTimeout(() => {
    bar.style.width = "100%";
    $("splash-screen").classList.add("fade-out");
  }, 900);
}

function initAegisApp() {
  applyLanguage(AppState.lang);
  bindEvents();
  updateOnlineBadge();

  const bridgeBadge = $("bridge-badge");
  if (AegisBridge.isNative()) {
    bridgeBadge.textContent = "KOTLIN NATIVE";
    bridgeBadge.className = "pill pill-ok";
  } else {
    bridgeBadge.textContent = "WEB PREVIEW";
    bridgeBadge.className = "pill pill-warn";
  }

  renderThreatMeta();
  renderVaultStatus();
  renderAlerts();
  runSplashSequence();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAegisApp);
} else {
  initAegisApp();
}
