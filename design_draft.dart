import 'package:flutter/material.dart';
import 'package:flutter/services.dart'; // For HapticFeedback
import 'dart:ui'; // For FontFeature

void main() {
  runApp(const PlumberUberApp());
}

// 1. Design System & Constants
class AppColors {
  static const Color background = Color(0xFFF1F5F9); // Cool Light Gray
  static const Color surface = Color(0xFFFFFFFF); // Clean White
  static const Color primary = Color(0xFF1E293B); // Deep Navy
  static const Color secondary = Color(0xFF059669); // Emerald Green
  static const Color alert = Color(0xFFEA580C); // Vivid Orange
  static const Color border = Color(0xFFCBD5E1); // Light Gray Border
}

class AppTextStyles {
  static const String fontFamily = 'Pretendard'; // 실제 적용시 폰트 에셋 필요 (여기선 기본 폰트 사용)

  static TextStyle get price => const TextStyle(
        fontSize: 26,
        fontWeight: FontWeight.bold,
        color: AppColors.secondary,
        fontFeatures: [FontFeature.tabularFigures()], // 고정폭 숫자
      );

  static TextStyle get body => const TextStyle(
        fontSize: 16,
        height: 1.5, // Line-height 150%
        color: AppColors.primary,
      );

  static TextStyle get title => const TextStyle(
        fontSize: 18,
        fontWeight: FontWeight.w600,
        color: AppColors.primary,
      );
}

class PlumberUberApp extends StatelessWidget {
  const PlumberUberApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Plumber Uber',
      theme: ThemeData(
        scaffoldBackgroundColor: AppColors.background,
        primaryColor: AppColors.primary,
        fontFamily: 'Roboto', // Pretendard 대체
        appBarTheme: const AppBarTheme(
          backgroundColor: AppColors.primary,
          elevation: 0,
          systemOverlayStyle: SystemUiOverlayStyle.light,
        ),
        useMaterial3: true,
      ),
      home: const DashboardScreen(),
    );
  }
}

// 2. Screen A: Dashboard
class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _selectedIndex = 0; // Filter selection

  final List<String> _filters = ['전체', '긴급', '예약', '가까운 거리'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // Top Navigation (Navy Bg)
      appBar: AppBar(
        toolbarHeight: 60,
        title: Row(
          children: [
            const Icon(Icons.location_on, color: Colors.white, size: 20),
            const SizedBox(width: 8),
            GestureDetector(
              onTap: () => _showLocationSettings(context),
              child: const Text(
                '경기 의왕시 오전동 ⌄',
                style: TextStyle(
                    color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
        actions: [
          // Status Indicator
          Container(
            margin: const EdgeInsets.only(right: 16),
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.2),
              borderRadius: BorderRadius.circular(20),
            ),
            child: const Row(
              children: [
                Icon(Icons.circle, color: AppColors.secondary, size: 12),
                SizedBox(width: 6),
                Text('온라인', style: TextStyle(color: Colors.white, fontSize: 14)),
              ],
            ),
          )
        ],
      ),
      body: Column(
        children: [
          // Filter Chips
          Container(
            color: AppColors.background,
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: List.generate(_filters.length, (index) {
                  final isSelected = _selectedIndex == index;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: InkWell(
                      onTap: () => setState(() => _selectedIndex = index),
                      borderRadius: BorderRadius.circular(24),
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 200),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 20, vertical: 10), // 터치 영역 확보
                        decoration: BoxDecoration(
                          color:
                              isSelected ? AppColors.primary : AppColors.surface,
                          borderRadius: BorderRadius.circular(24),
                          border: Border.all(
                            color: isSelected
                                ? AppColors.primary
                                : AppColors.border,
                          ),
                        ),
                        child: Text(
                          _filters[index],
                          style: TextStyle(
                            color: isSelected ? Colors.white : AppColors.primary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ),
                  );
                }),
              ),
            ),
          ),
          // Job List
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                _buildJobCard(context, true),
                const SizedBox(height: 16),
                _buildJobCard(context, false),
                const SizedBox(height: 16),
                _buildJobCard(context, false),
              ],
            ),
          ),
        ],
      ),
      // Floating Button (FAB)
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(context, MaterialPageRoute(builder: (_) => const WalletScreen()));
        },
        backgroundColor: AppColors.primary,
        elevation: 6,
        child: const Icon(Icons.map, color: Colors.white),
      ),
    );
  }

  Widget _buildJobCard(BuildContext context, bool isUrgent) {
    return GestureDetector(
      onTap: () {
        Navigator.push(context,
            MaterialPageRoute(builder: (context) => const JobDetailScreen()));
      },
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 6,
                offset: const Offset(0, 4)),
          ],
        ),
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Top Row
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                if (isUrgent)
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.alert,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: const Text('긴급',
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 12,
                            fontWeight: FontWeight.bold)),
                  )
                else
                  const SizedBox(), // Placeholder
                const Text('1.2km',
                    style: TextStyle(
                        color: Colors.grey,
                        fontWeight: FontWeight.bold,
                        fontFeatures: [FontFeature.tabularFigures()])),
              ],
            ),
            const SizedBox(height: 12),
            // Middle
            const Text('상가 1층 화장실 변기 막힘', style: AppTextStyles.title),
            const SizedBox(height: 16),
            // Bottom Right
            Align(
              alignment: Alignment.centerRight,
              child: Text('₩ 150,000', style: AppTextStyles.price),
            ),
          ],
        ),
      ),
    );
  }

  // Screen B: Location Settings (Bottom Sheet)
  void _showLocationSettings(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) => const LocationSettingSheet(),
    );
  }
}

class LocationSettingSheet extends StatefulWidget {
  const LocationSettingSheet({super.key});

  @override
  State<LocationSettingSheet> createState() => _LocationSettingSheetState();
}

class _LocationSettingSheetState extends State<LocationSettingSheet> {
  double _currentRange = 5;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 350,
      decoration: const BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.only(
            topLeft: Radius.circular(24), topRight: Radius.circular(24)),
      ),
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                  color: Colors.grey[300],
                  borderRadius: BorderRadius.circular(2)),
            ),
          ),
          const SizedBox(height: 30),
          const Text('작업 반경 설정',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
          const SizedBox(height: 40),
          
          // Custom Big Slider
          SliderTheme(
            data: SliderTheme.of(context).copyWith(
              trackHeight: 12, // Thick Track
              activeTrackColor: AppColors.primary,
              inactiveTrackColor: Colors.grey[300],
              thumbColor: AppColors.surface,
              thumbShape: const RoundSliderThumbShape(
                  enabledThumbRadius: 16, elevation: 4), // 32px Diameter Knob
              overlayShape: const RoundSliderOverlayShape(overlayRadius: 32),
            ),
            child: Slider(
              value: _currentRange,
              min: 1,
              max: 10,
              divisions: 9,
              onChanged: (val) {
                setState(() => _currentRange = val);
                HapticFeedback.selectionClick();
              },
            ),
          ),
          const SizedBox(height: 10),
          // Labels
          const Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('1km', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              Text('5km', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              Text('10km', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            ],
          ),
          const Spacer(),
          SizedBox(
            width: double.infinity,
            height: 56,
            child: ElevatedButton(
              onPressed: () => Navigator.pop(context),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              child: const Text('설정 완료', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
            ),
          )
        ],
      ),
    );
  }
}

// 3. Screen C: Job Detail
class JobDetailScreen extends StatelessWidget {
  const JobDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          // Map Header (30%)
          Expanded(
            flex: 3,
            child: Stack(
              fit: StackFit.expand,
              children: [
                Container(color: Colors.grey[300]), // Map Placeholder
                const Center(child: Icon(Icons.map, size: 50, color: Colors.grey)),
                Positioned(
                  top: 50,
                  left: 16,
                  child: CircleAvatar(
                    backgroundColor: Colors.white,
                    child: IconButton(
                      icon: const Icon(Icons.arrow_back, color: AppColors.primary),
                      onPressed: () => Navigator.pop(context),
                    ),
                  ),
                ),
                Positioned(
                  bottom: 16,
                  right: 16,
                  child: FloatingActionButton.small(
                    onPressed: () {},
                    backgroundColor: AppColors.primary,
                    child: const Icon(Icons.navigation, color: Colors.white),
                  ),
                ),
              ],
            ),
          ),
          // Info Body
          Expanded(
            flex: 7,
            child: Container(
              color: AppColors.surface,
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Photos
                    Row(
                      children: List.generate(3, (index) => Container(
                        margin: const EdgeInsets.only(right: 12),
                        width: 80,
                        height: 80,
                        decoration: BoxDecoration(
                          color: Colors.grey[200],
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: AppColors.border),
                        ),
                        child: const Icon(Icons.image, color: Colors.grey),
                      )),
                    ),
                    const SizedBox(height: 24),
                    // Title
                    const Text('상가 1층 화장실 변기 막힘',
                        style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppColors.primary)),
                    const SizedBox(height: 12),
                    // Address
                    Row(
                      children: [
                        const Icon(Icons.location_on_outlined, color: Colors.grey),
                        const SizedBox(width: 8),
                        Text('경기 의왕시 오전동 123-xx', style: AppTextStyles.body.copyWith(fontSize: 18)),
                      ],
                    ),
                    const SizedBox(height: 32),
                    const Text('요청 사항', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 8),
                    Text('손님들이 사용을 못하고 있습니다. 최대한 빨리 와주세요. 주차는 건물 뒤편에 가능합니다.',
                        style: AppTextStyles.body),
                     const SizedBox(height: 32),
                     Align(alignment: Alignment.centerRight, child: Text('₩ 150,000', style: AppTextStyles.price.copyWith(fontSize: 32))),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
      // Sticky Bottom Action
      bottomNavigationBar: const SlideToAcceptButton(),
    );
  }
}

// Custom Widget: Slide to Accept
class SlideToAcceptButton extends StatefulWidget {
  const SlideToAcceptButton({super.key});

  @override
  State<SlideToAcceptButton> createState() => _SlideToAcceptButtonState();
}

class _SlideToAcceptButtonState extends State<SlideToAcceptButton> {
  double _dragValue = 0.0;
  final double _maxWidth = 300.0; // 드래그 가능한 최대 너비 (화면 너비에 따라 조정 필요)

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;

    return Container(
      height: 80,
      color: AppColors.primary,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      child: Center(
        child: Stack(
          children: [
            // Track Text
            Container(
              width: double.infinity,
              height: 60,
              decoration: BoxDecoration(
                color: Colors.black26,
                borderRadius: BorderRadius.circular(30),
              ),
              alignment: Alignment.center,
              child: const Text(
                '밀어서 수락하기 (5분 내 도착) >>>',
                style: TextStyle(color: Colors.white54, fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
            // Handle
            Positioned(
              left: _dragValue,
              top: 0,
              bottom: 0,
              child: GestureDetector(
                onHorizontalDragUpdate: (details) {
                  setState(() {
                    _dragValue += details.delta.dx;
                    _dragValue = _dragValue.clamp(0.0, screenWidth - 32 - 60); // 32 padding, 60 knob size
                  });
                },
                onHorizontalDragEnd: (details) {
                  if (_dragValue > (screenWidth - 100) * 0.8) {
                     // Threshold passed
                    HapticFeedback.heavyImpact();
                    _showAcceptDialog();
                    setState(() => _dragValue = screenWidth - 32 - 60);
                  } else {
                    // Reset
                    setState(() => _dragValue = 0.0);
                  }
                },
                child: Container(
                  width: 60,
                  height: 60,
                  decoration: const BoxDecoration(
                    color: AppColors.secondary,
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.arrow_forward, color: Colors.white),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showAcceptDialog() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('수락 완료'),
        content: const Text('내비게이션을 실행합니다.'),
        actions: [TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('확인'))],
      ),
    );
  }
}

// 4. Screen D: Wallet
class WalletScreen extends StatelessWidget {
  const WalletScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('지갑', style: TextStyle(color: Colors.white)), centerTitle: true),
      body: Column(
        children: [
          // Summary Card
          Container(
            width: double.infinity,
            margin: const EdgeInsets.all(16),
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [AppColors.primary, Color(0xFF334155)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(16),
              boxShadow: const [BoxShadow(color: Colors.black26, blurRadius: 10, offset: Offset(0, 4))],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('출금 가능 금액', style: TextStyle(color: Colors.white70)),
                    GestureDetector(
                      onTap: (){},
                      child: const Text('출금하기 >', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                    )
                  ],
                ),
                const SizedBox(height: 20),
                const Center(
                  child: Text('₩ 452,000', 
                    style: TextStyle(
                      color: Colors.white, 
                      fontSize: 30, 
                      fontWeight: FontWeight.bold,
                      fontFeatures: [FontFeature.tabularFigures()]
                    ),
                  ),
                ),
              ],
            ),
          ),
          // Transaction List
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.all(16),
              itemCount: 10,
              separatorBuilder: (ctx, idx) => const Divider(height: 1),
              itemBuilder: (ctx, idx) {
                return Container(
                  color: Colors.transparent, // Transparent on List
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(idx % 2 == 0 ? '수전 교체 작업' : '변기 막힘 뚫음', 
                              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: AppColors.primary)),
                          const SizedBox(height: 4),
                          Text('2023.10.${20-idx}', style: const TextStyle(color: Colors.grey, fontSize: 12)),
                        ],
                      ),
                      Text(idx % 2 == 0 ? '+ 80,000' : '+ 150,000',
                          style: const TextStyle(
                              color: AppColors.secondary,
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              fontFeatures: [FontFeature.tabularFigures()])),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}