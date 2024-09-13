// src/opentelemetry.js
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

// 配置 Resource 并设置 SERVICE_NAME
const resource = new Resource({
	[SemanticResourceAttributes.SERVICE_NAME]: 'vue-service', // 替换为你的服务名称
})

// 创建 Tracer 提供者
const provider = new WebTracerProvider({
	resource: resource, // 设置 Resource
});

// 配置 OTLP 导出器，将数据发送到 OpenTelemetry Collector
const exporter = new OTLPTraceExporter({
	//url: 'http://zzdev.asia:4318/v1/traces', // 替换为你的 OpenTelemetry Collector 端点
  url: '/v1/traces', // 替换为你的 OpenTelemetry Collector 端点
});

// 使用批量处理器来发送 Spans
provider.addSpanProcessor(new BatchSpanProcessor(exporter));

// 注册自动探测的仪器
registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations({
      '@opentelemetry/instrumentation-fetch': {
        enabled: true,
        propagateTraceHeaderCorsUrls: [/.*/], // 配置要追踪的 Fetch 请求
      },
      '@opentelemetry/instrumentation-xml-http-request': {
        enabled: true,
        propagateTraceHeaderCorsUrls: [/.*/], // 配置要追踪的 XHR 请求
      },
      '@opentelemetry/instrumentation-user-interaction': {
        enabled: true, // 捕获用户交互事件（如点击、输入）
      },
      '@opentelemetry/instrumentation-document-load': {
        enabled: true, // 捕获页面加载时间
      },
      '@opentelemetry/instrumentation-history': {
        enabled: true, // 捕获路由导航
      },
    }),
  ],
});

// 注册提供者
provider.register();

export default provider;
