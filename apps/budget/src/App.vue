<template>
  <div class="simple-card">
    <div class="header">
      <img :src="logoUrl" alt="Logo" class="logo" />
      <h1>Budget App 👋</h1>
    </div>

    <div class="content">
      <div class="budget-layout">
        <div class="chart-side">
          <div v-if="isValidBudget" class="chart-container">
            <canvas ref="pieChart"></canvas>
          </div>
          <div v-else class="chart-placeholder">
            Please enter a valid budget amount to view the chart
          </div>
        </div>

        <div class="info-side">
          <div class="budget-input">
            <label>Total Budget: </label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter budget amount"
              v-model="budgetInput"
              class="input"
              @input="handleBudgetInput"
            />
            <div v-if="isOverBudget" class="warning-badge">Over Budget!</div>
          </div>

          <div class="expense-summary">
            <div class="summary-item">
              <span>Total Spent:</span>
              <span>{{ formatCurrency(totalExpenses) }}</span>
            </div>
            <div class="summary-item" v-if="isValidBudget">
              <span>Remaining:</span>
              <span :class="remainingBudgetClass">
                {{ formatCurrency(remainingBudget) }}
              </span>
            </div>
            <div class="summary-item" v-if="isValidBudget">
              <span>Budget Used:</span>
              <span :class="{ 'text-danger': isOverBudget }">
                {{ formatPercentage(budgetUsedPercentage) }}
              </span>
            </div>
          </div>

          <div v-if="isOverBudget" class="overspend-warning">
            You're over budget by
            {{ formatCurrency(Math.abs(remainingBudget)) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto';
import { config } from '@micro-frontends/shared';
import '@micro-frontends/shared-styles';

export default {
  name: 'BudgetApp',

  data() {
    return {
      logoUrl: `${config.budgetUrl}/assets/logo.png`,
      budgetInput: '100',
      expenses: [],
      currentChart: null,
    };
  },

  computed: {
    budget() {
      const value = parseFloat(this.budgetInput);
      return !isNaN(value) && value > 0 ? value : 0;
    },

    isValidBudget() {
      return this.budget > 0;
    },

    totalExpenses() {
      return this.expenses.reduce((sum, expense) => sum + expense.price, 0);
    },

    remainingBudget() {
      if (!this.isValidBudget) return 0;
      return this.budget - this.totalExpenses;
    },

    isOverBudget() {
      return this.isValidBudget && this.remainingBudget < 0;
    },

    budgetUsedPercentage() {
      if (!this.isValidBudget) return 0;
      return (this.totalExpenses / this.budget) * 100;
    },

    remainingBudgetClass() {
      if (!this.isValidBudget) return '';
      return {
        'text-danger': this.remainingBudget < 0,
        'text-success': this.remainingBudget > 0,
        'text-warning': this.remainingBudget === 0,
      };
    },

    chartData() {
      if (!this.isValidBudget) return null;

      // For the chart, we'll show expenses up to the budget amount
      // and highlight the overspend separately
      const expenseData = this.expenses.map((e) => e.price);
      const totalExpenses = expenseData.reduce((a, b) => a + b, 0);
      const overspend = Math.max(0, totalExpenses - this.budget);

      if (overspend > 0) {
        const labels = this.expenses.map((e) => e.name);
        const backgroundColors = [
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF6384',
        ];
        const selectedColors = backgroundColors.slice(0, labels.length);

        return {
          labels: [...labels, 'Overspend'],
          datasets: [
            {
              data: [...expenseData, overspend],
              backgroundColor: [...selectedColors, '#FF6384'],
            },
          ],
        };
      }

      const remaining = Math.max(0, this.remainingBudget);
      return {
        labels: [...this.expenses.map((e) => e.name), 'Remaining'],
        datasets: [
          {
            data: [...expenseData, remaining],
            backgroundColor: [
              '#4CAF50',
              '#2196F3',
              '#FFC107',
              '#9C27B0',
              '#81C784',
            ],
          },
        ],
      };
    },
  },

  methods: {
    formatCurrency(value) {
      if (typeof value !== 'number') return '$0.00';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    },

    formatPercentage(value) {
      if (!this.isValidBudget) return '0%';
      return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(value / 100);
    },

    handleBudgetInput(event) {
      const value = event.target.value;
      if (value === '' || isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
        this.budgetInput = '';
        return;
      }
      this.updateChart();
    },

    updateChart() {
      if (!this.isValidBudget || !this.chartData) return;

      this.$nextTick(() => {
        this.renderChart();
      });
    },

    renderChart() {
      const ctx = this.$refs.pieChart;
      if (!ctx) return;

      if (this.currentChart) {
        this.currentChart.destroy();
      }

      this.currentChart = new Chart(ctx, {
        type: 'pie',
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw;
                  const total = context.dataset.data.reduce((a, b) => a + b);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${this.formatCurrency(value)} (${percentage}%)`;
                },
              },
            },
          },
        },
      });
    },
  },

  mounted() {
    if (this.isValidBudget) {
      this.updateChart();
    }
    this.unsubscribeProductAdd = window.PubSub.subscribe(
      'product-added',
      (product) => {
        this.expenses.push(product);
        if (this.isValidBudget) {
          this.updateChart();
        }
      }
    );

    this.unsubscribeProductRemove = window.PubSub.subscribe(
      'product-removed',
      (product) => {
        this.expenses = this.expenses.filter((p) => p.id !== product.id);
        if (this.isValidBudget) {
          this.updateChart();
        }
      }
    );
  },

  beforeDestroy() {
    if (this.currentChart) {
      this.currentChart.destroy();
    }
    this.unsubscribeProductAdd?.();
    this.unsubscribeProductRemove?.();
  },

  watch: {
    chartData: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.budget-layout {
  display: flex;
  gap: 30px;
  align-items: start;
  min-height: 300px;
}

.chart-side {
  flex: 1;
  height: 300px;
  min-width: 300px;
}

.chart-container {
  height: 100%;
  width: 100%;
}

.chart-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #666;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
}

.info-side {
  flex: 0 0 250px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.budget-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}

.input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}

.input:focus {
  outline: none;
  border-color: #36a2eb;
  box-shadow: 0 0 0 2px rgba(54, 162, 235, 0.2);
}

.warning-badge {
  position: absolute;
  right: 0;
  top: 0;
  background: #dc3545;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  transform: translateY(-50%);
}

.overspend-warning {
  background: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.875rem;
  text-align: center;
}

.expense-summary {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.text-danger {
  color: #dc3545;
}

.text-success {
  color: #198754;
}

.text-warning {
  color: #ffc107;
}
</style>
